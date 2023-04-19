import React from 'react';
import style from './Button.module.scss'

const Button = ({content, icon, style_type}) => {
    let stl = icon ? style.with_icon : style.no_icon
    stl += ' ' + style_type
    return (
        <button className={stl}>
            {content}
            {icon}
        </button>
    );
};

export default Button;