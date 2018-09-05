


import React from 'react';

const SelectGroup = props =>
    <div className="form-group">
        <label
            htmlFor={props.id || Date.now()}>{props.title || ''}</label>
        <select type={props.type || 'text'}
                className="form-control"
                id={props.id || Date.now()}
                placeholder={props.placeholder || ''}>

            {props.options && props.options.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}

        </select>
        <small id="emailHelp"
               className="form-text text-muted">
            {props.muted || ''}
        </small>
    </div>

export default SelectGroup;
