import React from 'react';

const Card = props =>
    <div className="card card-body" style={props.style || {}}>
        {(props.title) ? <h5 className="card-title">{props.title}</h5> : ''}
        {props.children}
    </div>

export default Card;
