import React from 'react';

import isNotClickedStyle from './buttons.module.scss'
import isClickedStyle from './buttons.module.scss'

const ButtonPrimary = ({text, callback, isIcon, iconLink, isClicked}) => {

    let style = isClicked ? isClickedStyle : isNotClickedStyle
    return (
        <button className={style.primaryBody} onClick={callback}>
            {isIcon &&
                <img src={iconLink} alt={text}/>
            }
            <span className={style.text}>{text}</span>
        </button>
    );
};

export default ButtonPrimary;