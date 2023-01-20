import React from 'react';
import source from '../../../static/gifs/loader.gif'
import style from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={style.container}>
            <img src={source} alt={'Loader.gif'} width={192} className={style.animation}/>
            <span>Загрузка...</span>
        </div>
    );
};

export default Loader;