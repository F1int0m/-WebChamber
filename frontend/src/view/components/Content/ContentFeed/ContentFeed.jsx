import React, {useEffect} from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

import style from './contentFeed.module.scss'
import {useLocation} from "react-router-dom";
import challenge_filtered_list from "../../../../actions/challenge/challenge_filtered_list";
import {useDispatch, useSelector} from "react-redux";
import ContentList from "../ContentList/ContentList";
import post_filtered_list from "../../../../actions/post/post_filtered_list";

// TODO: вынести ContentFeed в отдельную фичу

const ContentFeed = ({pageType}) => {
    const location = useLocation()
    const pathname = location.pathname

    const dispatch = useDispatch()
    const args = useSelector(state => state.challenge.challenge_id)
    const userInfo = useSelector(state => state.profile)

    useEffect(() => {
        // console.log('(current pathname): ', pathname)
        if (pathname === '/chamber/challenges') {
            // console.log('(1) /chamber/challenges')
            // console.log('(2) fetch(challenge_filtered_list)')
            challenge_filtered_list(dispatch).then()
        } else if (pathname === '/chamber/casual') {
            post_filtered_list(dispatch, {}).then()
        } else if (pathname === '/challenge') {
            // console.log('(6) /challenge')
            // console.log('(7) fetch(post_filtered_list)')
            post_filtered_list(dispatch, args).then()
        } else if (pathname === '/profile/challenges' && userInfo.isSelf) {
            post_filtered_list(dispatch, {
                user_id: userInfo.user_id
            }).then()
        } else
            console.log('/not_in_ContentFeed_useEffect')

    }, [pathname, userInfo])

    const content = useSelector(state => {
        if (pageType === 'challenges-chamber')
            return state.challengeList
        else
            return state.postList.posts
    })
    const config = setupContentFeed(pageType, pathname)
    return (
        <div className={style.container}>
            <Search addContentButton={config.showButtons.addContent}/>
            {
                pathname === '/chamber/challenges'
                    ? <ContentList data={content}/>
                    : <ContentGrid data={content}/>
            }
        </div>
    );
};

export default ContentFeed;