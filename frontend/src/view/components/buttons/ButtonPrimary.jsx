import React from 'react';

import style from './buttons.module.scss'

const ButtonPrimary = ({text, callback}) => {
    return (
        <button className={style.primaryBody}>
            {text}
        </button>
    );
};

export default ButtonPrimary;