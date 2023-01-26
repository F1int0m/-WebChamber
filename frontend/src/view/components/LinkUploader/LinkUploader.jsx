import React from 'react';
import style from './LinkUploader.module.scss'

const LinkUploader = () => {
    return (
        <div className={style.container}>
            {/*<span className={style.text}>Вставить ссылку на видео с моей работой:</span>*/}
            <input type="text" placeholder={'URL-ссылка на Youtube видео'}/>
        </div>
    );
};

export default LinkUploader;