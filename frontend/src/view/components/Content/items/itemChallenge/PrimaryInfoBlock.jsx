import React from 'react';
import style from './ItemChallenge.module.scss'

const PrimaryInfoBlock = () => {
    // Описание не длиннее 400 символов при ширине itemContainer - 1156px

    return (
        <div className={style.primaryInfoBlockGroup}>
            <span className={style.infoBlockTitle}>#challengename</span>
            <span className={style.infoBlockDescription}>Описание</span>
        </div>
    );
};

export default PrimaryInfoBlock;