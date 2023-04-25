import React from 'react';
import style from './Meta.module.scss'

const Meta = ({curTime, limitTime, curFrame, limitFrame}) => {
    return (
        <div className={style.meta}>
            <div>
                <span>{curTime} - {limitTime}</span>
            </div>
            <div>
                <span>{curFrame} / {limitFrame}f</span>
            </div>
        </div>
    );
};

export default Meta;