import React from 'react';

const InputGroup = props =>
    <div className="form-group">
        <label
            htmlFor={props.id || Date.now()}>{props.title || ''}</label>
        <input
            onKeyPress={props.onKeyPress}
            value={props.value||''}
            style={props.style}
            onChange={props.onChange}
            defaultValue={props.defaultValue||undefined}
            disabled={props.disabled}
            type={props.type || 'text'}
            className="form-control"
            id={props.id || Date.now()}
            placeholder={props.placeholder || ''}/>
        <small id="emailHelp"
               className="form-text text-muted">
            {props.muted || ''}
        </small>
    </div>

export default InputGroup;