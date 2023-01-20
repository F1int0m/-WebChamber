import React, {useEffect} from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

import style from './contentFeed.module.scss'
import {useLocation} from "react-router-dom";
import challenge_filtered_list from "../../../../actions/challenge/challenge_filtered_list";
import {useDispatch, useSelector} from "react-redux";
import ContentList from "../ContentList/ContentList";

const ContentFeed = ({pageType, data}) => {
    const location = useLocation()
    const pathname = location.pathname
    const dispatch = useDispatch()

    useEffect(() => {
        pathname === '/chamber/challenges' && challenge_filtered_list(dispatch)
    }, [])

    const content = useSelector(state => {
        if (pageType === 'challenges-chamber')
            return state.challengeList
        else
            return state.challengeList
    })

    console.log('content: ', content)
    const config = setupContentFeed(pageType)
    return (
        <div className={style.container}>
            <Search addContentButton={config.showButtons.addContent}/>
            {
                pathname === '/chamber/challenges'
                    ? <ContentList content={content}/>
                    : <ContentGrid data={data}/>
            }
        </div>
    );
};

export default ContentFeed;