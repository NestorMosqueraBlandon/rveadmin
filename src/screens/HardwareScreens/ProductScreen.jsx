import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import DivisaFormater from '../../components/DivisaFormater';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../constants/productConstants';
import { listCategories } from '../../actions/categoryActions';

export default function ProductScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('612182bc4a06450023d2a87e');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('./img/default.png');

  const [search, setSearch] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName('');
      setBrand('');
      setCategory('');
      setPrice('');
      setImage('./img/default.png');
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listCategories());
    dispatch(listProducts(size, page));
  }, [dispatch, props.history, successDelete, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createProduct(name, brand, category, image, price));
  };
  console.log(page);
  const setPageHandler = (num) => {
    console.log(num);
    setPage(page + num);
    // setSize('10');
    if (page <= -1) {
      setPage(0);
      return;
    } else if (page >= 11) {
      setPage(11);
      return;
    }
    dispatch(listProducts(page));
  };

  const deleteHandler = (product) => {
    swal('Are you sure to delete ' + product.name + '?', {
      icon: 'warning',
      buttons: ['Obviously not', 'Do that!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + product.name + ' deleted', {
          icon: 'success',
        });
        dispatch(deleteProduct(product._id));
      }
    });
  };

  return (
    <>
      {loadingCategories && <LoadingBox></LoadingBox>}
      {errorCategories && (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      )}
      <div className="clean__card">
        <div className="card__header">
          <h2>Products</h2>
          <div className="buttons">
            <button className="btn" onClick={() => setOpenModal(!openModal)}>
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="clean__body">
        <div className="clean__body-header">
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : (
            <div className="form-group wid">
              <select
                name=""
                id=""
                className=""
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">ALL</option>

                {categories.map((categorie) => (
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group wid">
            <select
              name=""
              id=""
              className=""
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="AMD">AMD</option>
              <option value="INTEL">INTEL</option>
            </select>
          </div>
          <div className="form-group-icon">
            <input
              type="text"
              placeholder="Search a product"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr className="thead">
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Create At</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* {error && <MessageBox>{error}</MessageBox>} */}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : (
            <tbody>
              {products
                .filter((product) =>
                  product.brand
                    .toLowerCase()
                    .includes(searchBrand.toLowerCase())
                )

                .filter((product) =>
                  product.category
                    .toLowerCase()
                    .includes(searchCategory.toLowerCase())
                )
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((product) => (
                  <tr key={product._id}>
                    <td className="product__image">
                      <img src={product.image} alt="" />
                    </td>
                    <td>{product.name}</td>
                    {loadingCategories ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {categories
                          .filter(
                            (categorie) => categorie._id === product.category
                          )
                          .map((categorie) => (
                            <td>{categorie.name.toUpperCase()}</td>
                          ))}
                      </>
                    )}
                    <td>{product.brand}</td>
                    <td>
                      <DivisaFormater value={product.price} />
                    </td>
                    <td>{timeago.format(product.createdAt, 'en_US')}</td>
                    <td>
                      <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(product)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <div className="footer__buttons">
          <button className="btn" onClick={() => setPageHandler(-1)}>
            Prev
          </button>
          <button className="btn" onClick={() => setPageHandler(1)}>
            Next
          </button>
        </div>
      </div>

      <div className={openModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Product</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  {loadingCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <select
                      name=""
                      id=""
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value.toUpperCase())
                      }
                    >
                      <option value="">ALL</option>

                      {categories.map((categorie) => (
                        <option key={categorie._id} value={categorie._id}>
                          {categorie.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
