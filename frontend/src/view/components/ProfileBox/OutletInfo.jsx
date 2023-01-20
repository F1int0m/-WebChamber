import React from 'react';
import style from './OutletInfo.module.scss'

const OutletInfo = ({info}) => {
    return (
        <div>
            <span className={style.title}>{info.title}</span>
            <p className={style.description}>{info.description}</p>
        </div>
    );
};

export default OutletInfo;