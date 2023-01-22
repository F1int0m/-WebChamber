import React from 'react';
import style from './ItemChallenge.module.scss'

const PrimaryInfoBlock = () => {
    return (
        <div className={style.primaryInfoBlockGroup}>
            <span className={style.infoBlockTitle}>#challengename</span>
            <span className={style.infoBlockDescription}>Description</span>
        </div>
    );
};

export default PrimaryInfoBlock;