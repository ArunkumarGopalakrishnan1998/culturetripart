import React, { useEffect } from 'react'
import './Button.css'

function Button({name, callback, size='large', variant='positive', tooltip}) {

  return (
    <button className={`button ${size} ${variant}`} onClick={callback} title={tooltip}>
        {name}
    </button>
  )
}

export default Button