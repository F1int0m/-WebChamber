import React from 'react';
import styles from './profile.module.scss'
import avatarImage from '../../../static/images/profile.jpg'

const ProfileBox = ({isFull, info}) => {
    // Type: Preview / Full
    return (
        <div className={styles.profileBox}>
            <div className={styles.avatarBox}>
                <img src={avatarImage} alt={'avatar.jpg'}/>
            </div>
            <div className={styles.mainInfoBox}>
                <div className={styles.row1}>
                    <div className={styles.nickname}>{info.nickname}</div>
                    <button>Включить уведомления</button>
                    <button>Подписаться</button>
                </div>
                {isFull && <div>
                    <div className={styles.row2}>
                        <p>{info.statistics.subs}</p>
                        <p>{info.statistics.likes}</p>
                        <p>{info.statistics.saves}</p>
                    </div>
                    <div className={styles.row3}>
                        <p>{info.description}</p>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ProfileBox;