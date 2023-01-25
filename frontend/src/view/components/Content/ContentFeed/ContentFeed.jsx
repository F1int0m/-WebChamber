import React, {useEffect, useState} from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

import style from './contentFeed.module.scss'
import {useLocation} from "react-router-dom";
import challenge_filtered_list from "../../../../actions/challenge/challenge_filtered_list";
import {useDispatch, useSelector} from "react-redux";
import ContentList from "../ContentList/ContentList";
import post_filtered_list from "../../../../actions/post/post_filtered_list";
import user_get from "../../../../actions/user/user_get";

const ContentFeed = ({pageType}) => {
    const location = useLocation()
    const pathname = location.pathname
    const dispatch = useDispatch()
    const args = useSelector(state => state.challenge.challenge_id)
    const posts = useSelector(state => state.postList.posts)
    const userSelf = useSelector(state => state.auth)
    const userInfo = useSelector(state => state.profile)
    let authorsList = []
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (pathname === '/chamber/challenges') {
            console.log('/chamber/challenges')
            challenge_filtered_list(dispatch)
        }
        if (pathname === '/challenge') {
            console.log('/challenge')
            post_filtered_list(dispatch, args)
                .then(() => {
                    posts.map((post) => {
                        user_get(dispatch, post.author_ids[0])
                            .then((res) => authorsList.push(res))
                    })
                })
                .then(() => {
                    console.log('authorsList after user_get in map: ', authorsList)
                    setIsFetched(true)
                })
        }
        if (pathname === '/profile/challenges') {
            console.log('/profile/challenges')
            post_filtered_list(dispatch, {
                user_id: userSelf.user_id
            })
        }
        if (pathname === '/post') {
            console.log('/post')
            post_filtered_list(dispatch, {
                user_id: userInfo.user_id
            })
        }
    }, [pathname])

    useEffect(() => {
        if (isFetched) {
            console.log('isFetched: ', isFetched)
            console.log('authorsList after isFetched: ', authorsList)
        }
    }, [isFetched])

    const content = useSelector(state => {
        if (pageType === 'challenges-chamber')
            return state.challengeList
        else
            return state.postList.posts
    })

    console.log('(on page): ', pathname)
    console.log('(selected): ', content)
    const config = setupContentFeed(pageType)
    return (
        <div className={style.container}>
            <Search addContentButton={config.showButtons.addContent}/>
            {
                pathname === '/chamber/challenges'
                    ? <ContentList content={content}/>
                    : <ContentGrid data={content}/>
            }
        </div>
    );
};

export default ContentFeed;