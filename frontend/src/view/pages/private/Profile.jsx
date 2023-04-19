import React, {useEffect} from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {useDispatch, useSelector} from "react-redux";
import post_filtered_list from "../../../actions/post/post_filtered_list"
import Button from "../../../components/core/buttons/Button/Button";
import Icon from "../../../components/core/Icon/Icon";
import ButtonWithIcon from "../../../components/core/buttons/ButtonWithIcon/ButtonWithIcon";
import likes from "../../../static/icons/likes.svg";
import ButtonPrimary from "../../../components/shared/buttons/ButtonPrimary/ButtonPrimary";
import ButtonOutline from "../../../components/shared/buttons/ButtonOutline";


const Profile = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.profile)

    useEffect(() => {
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        }).then()
    }, [])

    const viewType = userInfo.isSelf ? 'SelfFull' : 'Full';



    return (
        <div className={style.setupProfile}>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <Button content={'Подписаться'}/>
            <ButtonPrimary content={'Like'}/>
            <ButtonOutline content={'Outline like'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;