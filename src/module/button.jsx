import React from 'react';

export default function Button({title, onClick, ...props}) {
    return(
       <button {...props} onClick={onClick}>
        {title}
       </button>
    )
}