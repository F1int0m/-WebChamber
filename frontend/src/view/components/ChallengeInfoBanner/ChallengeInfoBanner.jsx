import React from 'react';
import style from './ChallengeInfoBanner.module.scss'
import path from "../../../static/images/challenge-preview0.jpg";
import ButtonIcon from "../buttons/ButtonIcon";
import favourites from '../../../static/icons/favourites.svg'

const ChallengeInfoBanner = ({itemInfo}) => {
    const challengeName_normalized = itemInfo.name[0] === '#' ? itemInfo.name : '#' + itemInfo.name
    const normalized_end_datetime = 5
    return (
        <div className={style.container}>
            <img src={itemInfo.background_link} alt={''} className={style.backgroundImage}/>
            <div className={style.mainGroup}>
                <span className={style.infoBlockTitle}>{challengeName_normalized}</span>
                {/*<ButtonIcon source={favourites} alt={'favourites'} size={32}/>*/}
            </div>
            <span className={style.infoBlockDescription}>{itemInfo.description}</span>
            <div className={style.additionalGroup}>
                <span className={style.infoBlock}>Осталось {normalized_end_datetime} дней</span>
                <span className={style.infoBlock}>Всего {itemInfo.total_likes} лайков</span>
            </div>
        </div>
    );
};

export default ChallengeInfoBanner;