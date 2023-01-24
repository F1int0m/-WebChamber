import React from 'react';
import style from './FileUploader.module.scss'
import path from '../../../static/icons/uploadIcon.svg'

const FileUploader = ({file, handler}) => {
    return (
        <div className={style.container}>
            <label className={style.inputFile}>
                <input type="file" onChange={handler} accept={'.gif'}/>
                <img src={path} alt={'upload'}/>
                {
                    file
                        ? <span className={style.inputFileText}>{file.name}</span>
                        : <span className={style.inputFileText}>Загрузить .gif-файл</span>
                }
            </label>
        </div>
    );
};

export default FileUploader;