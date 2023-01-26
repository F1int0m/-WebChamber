import React from 'react';
import styles from "./AdditionalBox.module.scss";

import FavouritesIcon from '../../../static/icons/favourites.svg'
import LikesIcon from '../../../static/icons/likes.svg'

const AdditionalBox = ({info}) => {
    const subs = '2'
    const likes = '4'
    const saves = '2'
    const description = info.description || 'Много о себе не говорит.'
    return (
        <div>
            <div className={styles.row2}>
                <div className={styles.stats_box_subs}>
                    <span className={styles.stats_text}>{subs}</span>
                    <span>Подписчика(-ов)</span>
                </div>
                <div className={styles.stats_box}>
                    <span className={styles.stats_text}>{likes}</span>
                    <span className={styles.stats_icon_box}><img src={LikesIcon} alt={'Likes'}/></span>
                </div>
                <div className={styles.stats_box}>
                    <span className={styles.stats_text}>{saves}</span>
                    <span className={styles.stats_icon_box}><img src={FavouritesIcon} alt={'Favourites'}/></span>
                </div>
            </div>
            <div className={styles.row3}>
                <span className={styles.description}>{description}</span>
            </div>
        </div>
    );
};

export default AdditionalBox;