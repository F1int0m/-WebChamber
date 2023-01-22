import React from 'react';
import style from './ItemChallenge.module.scss'

const SecondaryInfoBlock = ({end_datetime, total_likes}) => {

    const normalized_end_datetime = 5

    return (
        <div className={style.secondaryInfoBlockGroup}>
            <span className={style.infoBlock}>Осталось {normalized_end_datetime} дней</span>
            <span className={style.infoBlock}>Всего {total_likes} лайков</span>
        </div>
    );
};

export default SecondaryInfoBlock;