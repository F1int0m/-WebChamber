import React, {useEffect} from 'react';
import ProfileBox from "../view/components/ProfileBox/ProfileBox";
import {Outlet, useNavigate} from "react-router-dom";
import style from '../view/pages/setupPages.module.scss'
import ContentHeader from "../view/components/Content/ContentHeader/ContentHeader";
import {useDispatch, useSelector} from "react-redux";
import post_filtered_list from "../actions/post/post_filtered_list"
import ButtonCustom from "../components/shared/ButtonCustom/ButtonCustom";


const Profile = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.profile)
    const navigate = useNavigate()

    useEffect(() => {
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        }).then()
    })

    function HandlePostClick() {
        navigate('/post')
    }

    const viewType = userInfo.isSelf ? 'SelfFull' : 'Full';

    return (
        <div className={style.setupProfile}>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <ButtonCustom
                content={'Post'}
                styleType={'primary'}
                callback={HandlePostClick}/>
            <Outlet/>
        </div>
    );
};

export default Profile;