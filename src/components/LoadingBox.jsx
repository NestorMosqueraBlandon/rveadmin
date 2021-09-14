import React from 'react'

export default function LoadingBox({color}) {
    return (
        <div className="center">
            <div className={color === "white"? "loading__container white" :  "loading__container"}>
            </div>
            <h3>LOADING</h3>
        </div>
    )
}
