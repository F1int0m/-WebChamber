import React from 'react';
import style from './ButtonWithIcon.module.scss'

const ButtonWithIcon = ({icon, content}) => {
    return (
        <button className={style.button_with_icon}>
            {content}
            {icon}
        </button>
    );
};

export default ButtonWithIcon;