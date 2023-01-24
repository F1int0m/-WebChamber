import React from 'react';

import style from './buttons.module.scss'

const ButtonIcon = ({source, alt}, size) => {
    return (
        <button className={style.iconBody}>
            <img src={source} alt={alt} width={size} height={size}/>
        </button>
    );
};

export default ButtonIcon;