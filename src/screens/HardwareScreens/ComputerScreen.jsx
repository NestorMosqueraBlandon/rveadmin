import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComputer,
  deleteComputer,
  listComputers,
} from '../../actions/computerActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import DivisaFormater from '../../components/DivisaFormater';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';
import {
  COMPUTER_CREATE_RESET,
  COMPUTER_DELETE_RESET,
} from '../../constants/computerConstants';
import { listCategories } from '../../actions/categoryActions';
import { listProducts } from '../../actions/productActions';

export default function ComputerScreen(props) {
  const computerList = useSelector((state) => state.computerList);
  const { loading, computers } = computerList;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingProducts, products } = productList;

  const computerCreate = useSelector((state) => state.computerCreate);
  const { success: successCreate } = computerCreate;

  const computerDelete = useSelector((state) => state.computerDelete);
  const { success: successDelete } = computerDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const [name, setName] = useState('');
  const [cpu, setCpu] = useState('');
  const [motherboard, setMotherboard] = useState('');
  const [ram, setRam] = useState('');
  const [ssd, setSsd] = useState('');
  const [hdd, setHdd] = useState('');
  const [powersupply, setPowersupply] = useState('');
  const [wattercooling, setWatercooling] = useState('');
  const [graphics, setGraphics] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('./img/default.png');

  const [search, setSearch] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: COMPUTER_CREATE_RESET });
      setName('');
      setBrand('');
      setPrice('');
      setImage('./img/default.png');
    }
    if (successDelete) {
      dispatch({ type: COMPUTER_DELETE_RESET });
    }
    dispatch(listCategories());
    dispatch(listComputers());
    dispatch(listProducts());
  }, [dispatch, props.history, successDelete, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createComputer(name, brand, image, price));
  };

  const deleteHandler = (computer) => {
    swal('Are you sure to delete ' + computer.name + '?', {
      icon: 'warning',
      buttons: ['Obviously not', 'Do that!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + computer.name + ' deleted', {
          icon: 'success',
        });
        dispatch(deleteComputer(computer._id));
      }
    });
  };

  return (
    <>
      {loadingCategories && <LoadingBox></LoadingBox>}
      {errorCategories && (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      )}
      <div className="card">
        <div className="card__header">
          <h2>Computers</h2>
          <div className="buttons">
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : (
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
            )}
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
              placeholder="Search a computer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" onClick={() => setOpenModal(!openModal)}>
              Create
            </button>
          </div>
        </div>
      </div>

      <>
        {
          <table>
            <thead>
              <tr className="thead">
                <th>Image</th>
                <th>Name</th>
                <th>Specs</th>
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
                {computers.map((computer) => (
                  <tr key={computer._id}>
                    <td className="product__image">
                      <img src={computer.image} alt="" />
                    </td>
                    <td>{computer.name}</td>
                    {loadingProducts ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <td>
                        <details>
                          {products.map((product) => (
                            <>
                              <summary>
                                {computer.specs.map((spec) =>
                                  spec.cpu === product._id ? (
                                    <span>{product.name}</span>
                                  ) : (
                                    <span>h</span>
                                  )
                                )}
                              </summary>
                              <p>
                                {computer.specs.map((spec) =>
                                  spec.cpu === product._id ? (
                                    <span>{product.name}</span>
                                  ) : (
                                    <span>h</span>
                                  )
                                )}
                              </p>
                            </>
                          ))}
                        </details>
                      </td>
                    )}

                    <td>{computer.brand}</td>
                    <td>
                      <DivisaFormater value={computer.price} />
                    </td>
                    <td>{timeago.format(computer.createdAt, 'en_US')}</td>
                    <td>
                      <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(computer)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        }
      </>

      <div className={openModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Computer</h2>
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
                {loadingProducts ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                      >
                        <option value="">CPU</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277871873780023b43881'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={wattercooling}
                        onChange={(e) => setWatercooling(e.target.value)}
                      >
                        <option value="">WATER COOLING</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614298665bd5c90023262c17'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={motherboard}
                        onChange={(e) => setMotherboard(e.target.value)}
                      >
                        <option value="">MOTHERBOARD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '6142778e1873780023b43885'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                      >
                        <option value="">RAM</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277b71873780023b4388d'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={ssd}
                        onChange={(e) => setSsd(e.target.value)}
                      >
                        <option value="">SSD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277c41873780023b43891'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={hdd}
                        onChange={(e) => setHdd(e.target.value)}
                      >
                        <option value="">HDD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277cf1873780023b43895'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={graphics}
                        onChange={(e) => setGraphics(e.target.value)}
                      >
                        <option value="">GRAPHICS CARD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277a41873780023b43889'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={powersupply}
                        onChange={(e) => setPowersupply(e.target.value)}
                      >
                        <option value="">POWER SUPPLY</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277a41873780023b43889'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                      >
                        <option value="">CASE</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === '614277da1873780023b43899'
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
