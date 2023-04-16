import React from 'react';
import './Button.module.scss'

const Button = ({icon, children}) => {
    return (
        <button>
            {icon}
            {children}
        </button>
    );
};

export default Button;