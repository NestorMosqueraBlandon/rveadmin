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
import axios from 'axios';

export default function ProductScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

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
  const [uploading, setUploading] = useState('./img/default.png');

  const [search, setSearch] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

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
    dispatch(listProducts());
  }, [dispatch, props.history, successDelete, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createProduct(name, brand, category, image, price));
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

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    console.log(bodyFormData);
    setUploading(true);
    axios
      .post('http://localhost:4000/api/v1/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <>
      {errorCategories && (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      )}
      {loadingCategories ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="card">
          <div className="card__header">
            <h2>Products</h2>
            <div className="buttons">
              <select
                name=""
                id=""
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
              <select
                name=""
                id=""
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              >
                <option value="">ALL</option>
                <option value="AMD">AMD</option>
                <option value="INTEL">INTEL</option>
              </select>
              <input
                type="text"
                placeholder="Search a product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn" onClick={() => setOpenModal(!openModal)}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          {
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
              <tbody>
               

              {errorCategories && <MessageBox variant="danger">{errorCategories}</MessageBox>}
                {loadingCategories && <LoadingBox></LoadingBox>}
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
                        product.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product._id}>
                          <td className="product__image">
                            <img src={product.image} alt="" />
                          </td>
                          <td>{product.name}</td>
                          {errorCategories && <MessageBox variant="danger">{errorCategories}</MessageBox>}
                {loadingCategories && <LoadingBox></LoadingBox>}
                          {categories
                            .filter(
                              (categorie) => categorie._id === product.category
                            )
                            .map((categorie) => (
                              <td>{categorie.name}</td>
                            ))}
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
            </table>
          }
        </>
      )}
    </>
  );
}
