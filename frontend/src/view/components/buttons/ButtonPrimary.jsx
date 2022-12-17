import React from 'react';

import style from './buttons.module.scss'

const ButtonPrimary = ({text, callback, isIcon, iconLink}) => {
    return (
        <button className={style.primaryBody}>
            {isIcon &&
                <img src={iconLink} alt={text}/>
            }
            <span className={style.text}>{text}</span>
        </button>
    );
};

export default ButtonPrimary;