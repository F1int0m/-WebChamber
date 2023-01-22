import React from 'react';
import style from './ItemChallenge.module.scss'

const SecondaryInfoBlock = () => {
    return (
        <div className={style.secondaryInfoBlockGroup}>
            <span className={style.infoBlock}>Осталось N дней</span>
            <span className={style.infoBlock}>Всего N лайков</span>
        </div>
    );
};

export default SecondaryInfoBlock;