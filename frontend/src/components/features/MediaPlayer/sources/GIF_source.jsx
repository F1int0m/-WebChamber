import React from 'react';

import style from './Sourse.module.scss'
import ControlPanel from "../ControlPanel/ControlPanel";

const GifSource = ({source}) => {
    return (
        <div className={style.mainContainer}>
            <div className={style.gifBox}>
                <img src={source} alt={'gif-file'} className={style.container}/>
            </div>
            <ControlPanel/>
        </div>
    );
};

export default GifSource;