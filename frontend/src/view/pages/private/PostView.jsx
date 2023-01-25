import React from 'react';
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {useSelector} from "react-redux";
import style from '../setupPages.module.scss'
import ContentGrid from "../../components/Content/ContentGrid/ContentGrid";
import {profileChallengesPosts} from "../../../system/fakeData";

const PostView = () => {
    const userInfo = useSelector(state => state.profile)
    const authInfo = useSelector(state => state.auth)
    const postInfo = useSelector(state => state.post)

    const viewType = authInfo.id === userInfo.user_id ? 'PreviewSelf' : 'Preview'

    console.log('userInfo: ', userInfo)
    console.log('authInfo: ', authInfo)
    console.log('postInfo: ', postInfo)
    return (
        <div className={style.setupPostView}>
            <MediaPlayer source={postInfo.data_link}/>
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            {/*<div className={style.recommendationsTitle}>*/}
            {/*    <h2 >Ещё от {userInfo.nickname}</h2>*/}
            {/*</div>*/}
            {/*<ContentGrid data={profileChallengesPosts}/>*/}
        </div>
    );
};

export default PostView;