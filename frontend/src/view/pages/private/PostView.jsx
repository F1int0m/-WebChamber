import React, {useState} from 'react';
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {useSelector} from "react-redux";
import style from '../setupPages.module.scss'
import ContentGrid from "../../components/Content/ContentGrid/ContentGrid";
import {profileChallengesPosts} from "../../../system/fakeData";

const PostView = () => {
    const profile = useSelector(state => state.profile)
    return (
        <div className={style.setupPostView}>
            <MediaPlayer />
            <ProfileBox isFull={false} profile={profile}/>
            <div className={style.recommendationsTitle}>
                <h2 >Ещё от {'Username'}</h2>
            </div>
            <ContentGrid data={profileChallengesPosts}/>
        </div>
    );
};

export default PostView;