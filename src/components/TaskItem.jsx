import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as timeago from 'timeago.js';
import { updateTask } from '../actions/taskActions';
import { TASK_CREATE_RESET, TASK_UPDATE_RESET } from '../constants/taskConstants';


export default function TaskItem({name, description, date, users, task}) {

    const taskUpdate = useSelector((state) => state.taskUpdate);
    const { success} = taskUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            dispatch({ type: TASK_UPDATE_RESET }); 
            window.location.replace('');
        }
    }, [dispatch, success])

    const submitHandler = (e) => {
        dispatch({ type: TASK_CREATE_RESET });

        dispatch(updateTask(task))
        
    }

    return (
        <div className="card__item">
                <div className="card__item-header">
                    <span className={`${task.priority}`}></span>
                    <button onClick={(e) => submitHandler(e)}><i className="bx bxs-check-circle"></i></button>
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="card__item-footer">
                    <div className="item__date">
                    <i className="bx bx-time"></i>
                        {timeago.format(date)}
                    </div>
                    <div className="users">
                        {users.map((user) =>(
                        <div className="picture" key={user.name}>
                            <img src={user.img} title={user.name} alt={user.name} />
                        </div>
                        )
                        )}

                    </div>
                </div>
            </div>
    )
}
