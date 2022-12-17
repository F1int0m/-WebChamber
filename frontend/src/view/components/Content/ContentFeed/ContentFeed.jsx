import React from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import setupContentFeed from "../setupContentFeed";

const ContentFeed = ({pageType, data}) => {
    const config = setupContentFeed(pageType)
    return (
        <div>
            <Search addContentButton={config.showButtons.addContent}/>
            <ContentGrid data={data}/>
        </div>
    );
};

export default ContentFeed;