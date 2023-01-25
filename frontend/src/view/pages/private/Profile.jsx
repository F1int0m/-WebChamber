import React, {useEffect} from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {useDispatch, useSelector} from "react-redux";
import post_filtered_list from "../../../actions/post/post_filtered_list"


const Profile = () => {
    // viewType: Preview / SelfPreview / Full / SelfFull
    // console.log('(18) done')

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.profile)

    useEffect(() => {
        // console.log('(16) fetch(post_filtered_list)')
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        }).then()
    }, [])

    const viewType = userInfo.isSelf ? 'SelfFull' : 'Full';

    return (
        <div className={style.setupProfile}>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;