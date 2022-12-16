import React from 'react';

import style from './buttons.module.scss'

const ButtonIcon = ({source, alt}) => {
    return (
        <button className={style.iconBody}>
            <img src={source} alt={alt}/>
        </button>
    );
};

export default ButtonIcon;