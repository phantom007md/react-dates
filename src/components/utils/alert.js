import React, {Component} from 'react';

const Alert = props => {
    let className = '';
    if (props.success){
        className = 'alert alert-success';
    }else if(props.warning) {
        className = 'alert alert-warning';
    }else if(props.danger) {
        className = 'alert alert-danger';
    }
    return <div className={ className + "  fade show" } role="alert">
        {props.children}
        <button onClick={props.handleOnClick}
                style={{float: 'left', right: 'auto', left: '0'}}
                type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
}

export default Alert;
