import React, {useEffect} from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {useDispatch, useSelector} from "react-redux";
import user_get_self from "../../../actions/user/user_get_self";
import post_filtered_list from "../../../actions/post/post_filtered_list"
import user_get from "../../../actions/user/user_get";


const Profile = () => {
    // viewType: Preview / SelfPreview / Full / SelfFull

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.profile)
    const authInfo = useSelector(state => state.auth)
    const isSelf = authInfo.id === userInfo.user_id


    useEffect(() => {
        isSelf ? user_get_self(dispatch) : user_get(dispatch, userInfo.user_id)
    }, [])

    useEffect(() => {
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        }).then()
    }, [])


    const viewType = authInfo.id === userInfo.user_id ? 'SelfFull' : 'Full';

    return (
        <div className={style.setupProfile}>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;