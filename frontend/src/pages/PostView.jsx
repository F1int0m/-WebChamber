import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import style from '../view/pages/setupPages.module.scss'

import MediaPlayer from "../components/features/MediaPlayer/MediaPlayer";
import ProfileBox from "../view/components/ProfileBox/ProfileBox";
import ContentGrid from "../view/components/Content/ContentGrid/ContentGrid";
import TitleGrid from "../components/shared/TitleGrid/TitleGrid";

import user_get_self from "../actions/user/user_get_self";
import user_get from "../actions/user/user_get";

import animation from './fakedata/legs.gif'

const PostView = () => {
    const userSelf = useSelector(state => state.auth)
    const userInfo = useSelector(state => state.profile)
    const postInfo = useSelector(state => state.post)
    const content = useSelector(state => state.postList.posts)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     const postAuthorId = postInfo.author_ids[0]
    //     if (postAuthorId === userSelf.user_id)
    //         user_get_self(dispatch).then()
    //     else
    //         user_get(dispatch, postAuthorId).then()
    // }, [])

    const viewType = userInfo.isSelf ? 'PreviewSelf' : 'Preview'
    return (
        <div className={style.setupPostView}>
            {/*<MediaPlayer source={postInfo.data_link}/>*/}
            <MediaPlayer source={animation}/>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <TitleGrid content={'Больше работ автора'}/>
            <ContentGrid data={content}/>
        </div>
    );
};

export default PostView;