import React from 'react';
import style from './ItemChallenge.module.scss'

const PrimaryInfoBlock = ({title, description}) => {
    // Описание не длиннее 400 символов при ширине itemContainer - 1156px

    const normalizedTitle = title[0] === '#' ? title : '#' + title

    return (
        <div className={style.primaryInfoBlockGroup}>
            <span className={style.infoBlockTitle}>{normalizedTitle}</span>
            <span className={style.infoBlockDescription}>{description}</span>
        </div>
    );
};

export default PrimaryInfoBlock;