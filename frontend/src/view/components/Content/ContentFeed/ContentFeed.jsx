import React from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

import style from './contentFeed.module.scss'

const ContentFeed = ({pageType, data}) => {
    const config = setupContentFeed(pageType)
    return (
        <div className={style.container}>
            <Search addContentButton={config.showButtons.addContent}/>
            <ContentGrid data={data}/>
        </div>
    );
};

export default ContentFeed;