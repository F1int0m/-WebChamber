import React from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {useSelector} from "react-redux";

const Profile = () => {
    const profile = useSelector(state => state.profile)
    console.log(profile)
    return (
        <div className={style.setupProfile}>
            <ProfileBox isFull={true} profile={profile}/>
            <ContentHeader page={'profile'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;