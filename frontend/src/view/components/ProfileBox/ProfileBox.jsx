import React from 'react';

import fullStyle from './profileFull.module.scss'
import previewStyle from './profilePreview.module.scss'

import InfoBox from "./InfoBox";
import avatar from '../../../static/images/profile.jpg'
import {useLocation} from "react-router-dom";

function ProfileBox({isFull, userInfo}){
    // Type: Preview / Full

    const location = useLocation();
    const style = location.pathname.toString() === '/post' ? previewStyle : fullStyle

    return (
        <div className={style.profileBox}>
            <div className={style.avatarBox}>
                <img src={avatar} alt={'avatar.jpg'} className={style.avatarImg}/>
            </div>
            <InfoBox isFull={isFull} userInfo={userInfo}/>
        </div>
    );
}

export default ProfileBox;