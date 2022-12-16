import React from 'react';
import styles from './profile.module.scss'
import avatarImage from '../../../static/images/profile.jpg'
import InfoBox from "./InfoBox";

const ProfileBox = ({isFull, info}) => {
    // Type: Preview / Full
    return (
        <div className={styles.profileBox}>
            <div className={styles.avatarBox}>
                <img src={avatarImage} alt={'avatar.jpg'}/>
            </div>
            <InfoBox isFull={isFull} info={info}/>
        </div>
    );
};

export default ProfileBox;