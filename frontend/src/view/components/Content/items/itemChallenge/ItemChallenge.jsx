import React from 'react';
import style from './ItemChallenge.module.scss'

import path from '../../../../../static/images/challenge-preview.jpg'
import PrimaryInfoBlock from "./PrimaryInfoBlock";
import SecondaryInfoBlock from "./SecondaryInfoBlock";

const ItemChallenge = ({itemInfo}) => {
    return (
        <div className={style.container}>
            <div className={style.flexContainer}>
                <PrimaryInfoBlock />
                <SecondaryInfoBlock />
            </div>
            <img src={path} className={style.backgroundImage} alt={''}/>
        </div>
    );
};

export default ItemChallenge;