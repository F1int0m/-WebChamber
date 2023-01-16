import React from 'react';

import fullStyle from './profileFull.module.scss'
import previewStyle from './profilePreview.module.scss'

import InfoBox from "./InfoBox";
import avatar from '../../../static/images/profile.jpg'
import {useLocation} from "react-router-dom";

function ProfileBox({isFull, profile}){
    // Type: Preview / Full

    const location = useLocation();
    const style = location.pathname.toString() === '/post' ? previewStyle : fullStyle

    if (profile.isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className={style.profileBox}>
                <div className={style.avatarBox}>
                    <img src={avatar} alt={'avatar.jpg'} className={style.avatarImg}/>
                </div>
                <InfoBox isFull={isFull} info={profile}/>
            </div>
        );
    }
}

export default ProfileBox;