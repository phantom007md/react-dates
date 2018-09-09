import React from 'react';

const Card = props =>
    <div className="card card-body" style={props.style || {}}>
        {(props.title) ?
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className="card-title">{props.title}</h5>
                {props.withToggle &&
                <label htmlFor="togglePastDates" className='d-flex align-items-center'>
                    <span style={{padding: '0 5px', color: '#854000', userSelect: 'none'}}>نمایش قرار های قبلی من</span>
                    <input onChange={props.handleToggle} id='togglePastDates' type="checkbox"/>
                </label>}
            </div> : ''}
        {props.children}
    </div>

export default Card;
