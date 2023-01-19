import React, {useEffect} from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {useDispatch, useSelector} from "react-redux";
import user_get_self from "../../../actions/user/user_get_self";
import post_filtered_list from "../../../actions/post/post_filtered_list"


const Profile = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        user_get_self(dispatch)
    }, [])

    const userInfo = useSelector(state => state.profile)

    useEffect(() => {
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        })
    }, [])

    return (
        <div className={style.setupProfile}>
            <ProfileBox isFull={true} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;