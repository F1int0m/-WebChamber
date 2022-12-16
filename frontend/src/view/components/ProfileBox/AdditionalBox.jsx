import React from 'react';
import styles from "./profile.module.scss";

import FavouritesIcon from '../../../static/icons/favourites.svg'
import LikesIcon from '../../../static/icons/likes.svg'

const AdditionalBox = ({info}) => {
    return (
        <div>
            <div className={styles.row2}>
                <span className={styles.stats}>{info.statistics.subs}</span><span>Подписчиков</span>
                <span className={styles.stats}>{info.statistics.likes}</span><span><img src={LikesIcon} alt={'Likes'}/></span>
                <span className={styles.stats}>{info.statistics.saves}</span><span><img src={FavouritesIcon} alt={'Favourites'}/></span>
            </div>
            <div className={styles.row3}>
                <span className={styles.description}>{info.description}</span>
            </div>
        </div>
    );
};

export default AdditionalBox;