import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, listTasks } from '../../actions/taskActions';
import LoadingBox from '../../components/LoadingBox';
import TaskCard from '../../components/TaskCard';
import TaskItem from '../../components/TaskItem';
import { TASK_CREATE_RESET } from '../../constants/taskConstants';
import Push from 'push.js'
export default function TaskScreen() {
  const [openModal, setOpenModal] = useState(false);

  const [priority, setPriority] = useState('Delayed');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);

  const taskList = useSelector((state) => state.taskList)
  const { loading, error, tasks } = taskList;

  const taskCreate = useSelector((state) => state.taskCreate);
  const { success: successCreate } = taskCreate;
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createTask(priority, title, description, users));
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TASK_CREATE_RESET });
      setTitle('');
      setDescription("");
      setPriority("Delayed");
      setUsers([]); 
      Push.create(title)
      // window.location.replace('');
    }
    dispatch(listTasks())
  }, [dispatch, successCreate])


  const addUser = (data) =>{
    setUsers(prevItems => [...prevItems, {
      name: data.name,
      img: data.img
    }]);
  }

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
          {loading ? <LoadingBox></LoadingBox> :
            (
              <div className="task__container">
                <TaskCard title="To do">
                  {tasks.filter((task) => task.state === 0 )
                  .map((task) => (
                    <TaskItem 
                    key={task._id}
                      name={task.title}
                      description={task.description}
                      date={task.createdAt}
                      users={task.users}
                      task={task}
                       />
                  ))}
                </TaskCard>
                <TaskCard title="In Process"> 
                {tasks.filter((task) => task.state === 1 )
                  .map((task) => (
                    <TaskItem 
                    key={task._id}
                      name={task.title}
                      description={task.description}
                      date={task.createdAt}
                      users={task.users}
                      task={task}
                       />
                  ))}
                </TaskCard>
                <TaskCard title="Review"> 
                {tasks.filter((task) => task.state === 2 )
                  .map((task) => (
                    <TaskItem 
                    key={task._id}
                      name={task.title}
                      description={task.description}
                      date={task.createdAt}
                      users={task.users}
                      task={task}
                       />
                  ))}
                </TaskCard>
                <TaskCard title="Finished"> 
                {tasks.filter((task) => task.state === 3 )
                  .map((task) => (
                    <TaskItem 
                    key={task._id}
                      name={task.title}
                      description={task.description}
                      date={task.createdAt}
                      users={task.users}
                      task={task}
                       />
                  ))}
                </TaskCard>

              </div>
            )
          }
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
                    <option value="Delayed">Delayed</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Express">Express</option>
                  </select>
                </div>

                <div className="form-group">
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className="form-grup labels-task">
                  <label htmlFor="nestor" title="Nestor Mosquera">
                    <div className="picture">
                      <img src="./img/ceo.png" alt="" />
                    </div>
                    <input type="checkbox" onChange={() => addUser({name: "Nestor Mosquera", img:"./img/ceo.png"})} name="nestor" id="nestor" />
                  </label>
                  <label htmlFor="luis">
                  <div className="picture">
                      <img src="./img/cto.png" alt="" />
                    </div>
                    <input type="checkbox" onChange={() => addUser({name: "Luis Mosquera", img:"./img/cto.png"})} name="" id="luis" />
                  </label>
                  <label htmlFor="jhonier">
                  <div className="picture">
                      <img src="./img/cmo.png" alt="" />
                    </div>
                  <input type="checkbox" onChange={() => addUser({name: "Jhonier Pizarro", img:"./img/cmo.png"})} name="" id="jhonier" />
                  </label>
                  <label htmlFor="javier">
                  <div className="picture">
                      <img src="./img/pm.png" alt="" />
                    </div>
                  <input type="checkbox" onChange={() => addUser({name: "Javier Caldea", img:"./img/pm.png"})} name="" id="javier" />

                  </label>
                  <label htmlFor="juan">
                  <div className="picture">
                      <img src="./img/cio.png" alt="" />
                    </div>
                  <input type="checkbox" onChange={() => addUser({name: "Juan Chaverra", img:"./img/cio.png"})} name="" id="juan" />

                  </label>


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
