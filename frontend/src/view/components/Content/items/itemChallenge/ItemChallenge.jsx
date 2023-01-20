import React from 'react';
import style from './itemChallenge.module.scss'
import path from '../../../../../static/images/challenge-preview.jpg'

const ItemChallenge = ({itemInfo}) => {
    return (
        <div>
            <img src={path} className={style.backgroundImage} alt={''}/>
        </div>
    );
};

export default ItemChallenge;