import React from 'react';
import style from './Button.module.scss'

const Button = ({content}) => {
    return (
        <button className={style.button}>
            {content}
        </button>
    );
};

export default Button;