import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  deleteCategory,
  listCategories,
} from '../../actions/categoryActions';
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
} from '../../constants/categoryConstants';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';

export default function CategoryScreen(props) {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName('');
    }
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(listCategories());
  }, [dispatch, props.history, successDelete, successCreate]);

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
        dispatch(deleteCategory(product._id));
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createCategory(name));
  };

  return (
    <div className="clean__card">
      <div className="card__header">
        <h2>Categories</h2>
        <div className="buttons">
          <button className="btn" onClick={() => setOpenModal(!openModal)}>
            Create Category
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingBox color="white"></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="clean__body">
          <div className="clean__body-header">
            <div className="form-group-icon">
              <i className="bx bx-search-alt-2"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search a category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr className="thead">
                <th>Name</th>
                <th>Create At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .filter((category) =>
                  category.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((category) => (
                  <tr key={category._id}>
                    <td>{category.name.toUpperCase()}</td>
                    <td>{timeago.format(category.createdAt, 'en_US')}</td>
                    <td>
                      <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(category)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={openModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Category</h2>
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
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
