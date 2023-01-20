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

    const viewType = authInfo.id === userInfo.user_id ? 'PreviewSelf' : 'Preview'

    return (
        <div className={style.setupPostView}>
            <MediaPlayer />
            <ProfileBox viewType={viewType} userInfo={userInfo}/>
            <div className={style.recommendationsTitle}>
                <h2 >Ещё от {'Username'}</h2>
            </div>
            <ContentGrid data={profileChallengesPosts}/>
        </div>
    );
};

export default PostView;