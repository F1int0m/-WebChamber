import React from 'react';
import style from './ItemChallenge.module.scss'

const SecondaryInfoBlock = () => {
    return (
        <div className={style.secondaryInfoBlockGroup}>
            <span className={style.infoBlock}>Deadline time</span>
            <span className={style.infoBlock}>Total likes counter</span>
        </div>
    );
};

export default SecondaryInfoBlock;