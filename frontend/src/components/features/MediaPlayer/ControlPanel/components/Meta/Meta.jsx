import React from 'react';
import style from './Meta.module.scss'

const Meta = ({meta}) => {
    return (
        <div className={style.meta}>
            <div>
                <span>Кадр: {meta.get_current_frame()} ({meta.get_length()})</span>
            </div>
        </div>
    );
};

export default Meta;