import React from 'react'
import './Input.css';

function Input({id, type, onChangeCallback, onEnterCallback, defaultValue, size, ariaLabel}) {
    const onEnter = (e) => {
        if (e.keyCode === 13) {
            onEnterCallback();
        }
    }
  return (
    <input data-testid={id} className={`input ${size}`} aria-label={ariaLabel} id={id} type={type} onChange={onChangeCallback} onKeyDown={(e) => onEnter(e)} defaultValue={defaultValue}></input>
  )
}

export default Input