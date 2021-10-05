import React from 'react'
import * as timeago from 'timeago.js';

export default function TaskCard({title, priority}) {
    return (
        <div className="task__card">
        <div className="task__card-title">
          <h2>{title}</h2>
        </div>
        <div className="task__card-body">
            <div className="card__item">
                <div className="card__item-header">
                    <span></span>
                    <button><i class="bx bxs-check-circle"></i></button>
                </div>
                <h3>Quotation</h3>
                <p>Descriptioin</p>
                <div className="card__item-footer">
                    <div className="item__date">
                    <i class="bx bx-time"></i>
                        2 months ago
                    </div>
                    <div className="users">
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}
