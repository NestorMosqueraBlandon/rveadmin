import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import TaskCard from '../../components/TaskCard';

export default function TaskScreen() {
  const [openModal, setOpenModal] = useState(false);

  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createTask(priority, title));
  };

  return (
    <>
      <div className="clean__card">
        <div className="card__header">
          <h2>Tasks</h2>
          <div className="buttons">
            <button className="btn" onClick={() => setOpenModal(!openModal)}>
              Create Task
            </button>
          </div>
        </div>

        <div className="body">
          <div className="task__container">
            <TaskCard title="To do" />
            <TaskCard title="In Process" />
            <TaskCard title="Reviews" />
            <TaskCard title="Finished" />

          </div>
        </div>
      </div>

      <div className={openModal ? 'modal active' : 'modal'}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Task</h2>
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
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
                    <option value="">Delayed</option>
                    <option value="">Moderate</option>
                    <option value="">Express</option>
                  </select>
                </div>

                <div className="form-group">
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
                </div>
                <div className="form-grup">
                  <input type="checkbox" name="" id="" />
                  <input type="checkbox" name="" id="" />
                  <input type="checkbox" name="" id="" />
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
    </>
  );
}
