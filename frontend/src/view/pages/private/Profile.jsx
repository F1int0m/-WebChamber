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
import {like_icon_path} from "../../../components/core/Icon/Icons";


const Profile = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.profile)

    useEffect(() => {
        post_filtered_list(dispatch, {
            user_id: userInfo.user_id
        }).then()
    }, [])

    const viewType = userInfo.isSelf ? 'SelfFull' : 'Full';

    const like_icon = <Icon
        path_d={like_icon_path}
        strokeWidth={"1.61905"}
        width={24}
        height={24}
        viewBox={'-3 -4 24 24'}
        fill_color={'None'}
        stroke_color={'#FFFFFF'}
    />

    return (
        <div className={style.setupProfile}>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <ContentHeader page={'profile'}/>
            <ButtonWithIcon content={'Лайк'} icon={like_icon} />
            <Button content={'Подписаться'}/>
            <Outlet/>
        </div>
    );
};

export default Profile;