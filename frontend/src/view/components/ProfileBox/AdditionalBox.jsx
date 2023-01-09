import React from 'react';
import styles from "./profile.module.scss";

import FavouritesIcon from '../../../static/icons/favourites.svg'
import LikesIcon from '../../../static/icons/likes.svg'

const AdditionalBox = ({info}) => {
    const subs = '12 000'
    const likes = '103 455'
    const saves = '20 140'
    const description = 'А также некоторые особенности внутренней политики призваны к ответу. В частности, внедрение современных методик однозначно определяет каждого участника как способного принимать собственные решения касаемо направле...'

    return (
        <div>
            <div className={styles.row2}>
                <div className={styles.stats_box_subs}>
                    <span className={styles.stats_text}>{subs}</span>
                    <span>Подписчиков</span>
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