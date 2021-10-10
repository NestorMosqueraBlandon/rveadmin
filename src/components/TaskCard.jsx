import React from 'react'

export default function TaskCard({title, children}) {
    return (
        <div className="task__card">
        <div className="task__card-title">
          <h2>{title}</h2>
        </div>
        <div className="task__card-body">
            {children}
        </div>
      </div>
    )
}
