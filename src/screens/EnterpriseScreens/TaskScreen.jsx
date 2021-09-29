import React, { useState } from 'react';

export default function TaskScreen() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="clean__card">
      <div className="card__header">
        <h2>Tasks</h2>
        <div className="buttons">
          <button className="btn" onClick={() => setOpenModal(!openModal)}>
            Create Task
          </button>
        </div>
      </div>

      <div className="clean__body">
        <div className="task__container">
          <div className="task__card">
            <div className="task__card-title">
              <h2>To do</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
