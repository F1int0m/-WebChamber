import React, {useEffect} from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

import style from './contentFeed.module.scss'
import {useLocation} from "react-router-dom";
import challenge_filtered_list from "../../../../actions/challenge/challenge_filtered_list";
import {useDispatch} from "react-redux";

const ContentFeed = ({pageType, data}) => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const pathname = location.pathname
        pathname === '/chamber/challenges' && challenge_filtered_list(dispatch)
    }, [])

    const config = setupContentFeed(pageType)
    return (
        <div className={style.container}>
            <Search addContentButton={config.showButtons.addContent}/>
            <ContentGrid data=вызо{data}/>
        </div>
    );
};

export default ContentFeed;