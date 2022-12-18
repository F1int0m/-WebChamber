import React from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {info} from "../../../system/fakeData";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";

const Profile = () => {
    return (
        <div className={style.setupProfile}>
            <ProfileBox isFull={true} info={info}/>
            <ContentHeader page={'profile'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;