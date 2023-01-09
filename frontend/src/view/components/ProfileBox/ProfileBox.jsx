import React from 'react';
import styles from './profile.module.scss'
import InfoBox from "./InfoBox";
// import avatar from '../../../static/images/profile.jpg'

function ProfileBox({isFull, profile}){
    // Type: Preview / Full

    if (profile.isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className={styles.profileBox}>
                <div className={styles.avatarBox}>
                    <img src={''} alt={'avatar.jpg'} className={styles.avatarImg}/>
                </div>
                <InfoBox isFull={isFull} info={profile}/>
            </div>
        );
    }
}

export default ProfileBox;