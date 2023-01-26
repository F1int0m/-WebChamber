import React from 'react';

import fullStyle from './profileFull.module.scss'
import previewStyle from './profilePreview.module.scss'

import InfoBox from "./InfoBox";
import {useLocation, useNavigate} from "react-router-dom";

function ProfileBox({viewType, userInfo}){
    // viewType: Preview / SelfPreview / Full / SelfFull
    const navigate = useNavigate()
    const location = useLocation();
    const style = location.pathname === '/post' ? previewStyle : fullStyle

    function handleOpeningProfile() {
        if(location.pathname === '/post')
            console.log('(15) /profile/challenges')
            navigate('/profile/challenges')
    }

    return (
        <div className={style.profileBox}>
            <div className={style.avatarBox}>
                <img src={userInfo.avatar_link} alt={'avatar.jpg'} className={style.avatarImg}/>
            </div>
            <InfoBox viewType={viewType} userInfo={userInfo} callback={handleOpeningProfile}/>
        </div>
    );
}

export default ProfileBox;