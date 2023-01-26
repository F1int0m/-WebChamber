import React, {useEffect, useState} from 'react';
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {useDispatch, useSelector} from "react-redux";
import style from '../setupPages.module.scss'
// import ContentGrid from "../../components/Content/ContentGrid/ContentGrid";
// import {profileChallengesPosts} from "../../../system/fakeData";
import user_get_self from "../../../actions/user/user_get_self";
import user_get from "../../../actions/user/user_get";
import ContentGrid from "../../components/Content/ContentGrid/ContentGrid";

const PostView = () => {
    const userSelf = useSelector(state => state.auth)
    const userInfo = useSelector(state => state.profile)
    const postInfo = useSelector(state => state.post)
    const content = useSelector(state => state.postList.posts)
    // console.log('(14) got store data')
    // console.log('userInfo: ', userSelf)
    // console.log('postInfo: ', postInfo)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('(11) /post')
        console.log('(12) fetch author of post')
        const postAuthorId = postInfo.author_ids[0]
        if (postAuthorId === userSelf.user_id)
            user_get_self(dispatch).then()
        else
            user_get(dispatch, postAuthorId).then()
    }, [])

    const viewType = userInfo.isSelf ? 'PreviewSelf' : 'Preview'
    return (
        <div className={style.setupPostView}>
            <MediaPlayer source={postInfo.data_link}/>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <div className={style.recommendationsTitle}>
                <h2>Больше работ автора</h2>
            </div>
            <ContentGrid data={content}/>
        </div>
    );
};

export default PostView;