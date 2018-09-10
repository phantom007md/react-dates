import React from 'react';

const Card = props =>
    <div className="card card-body" style={props.style || {}}>
        {(props.title) ?
            <div style={props.style || null} className='d-flex justify-content-between align-items-center'>
                <h5 className="card-title">{props.title}</h5>
                {props.prevDates}
            </div> : ''}
        {props.children}
    </div>

export default Card;
