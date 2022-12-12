import React from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";

const ContentFeed = ({addContentButton, data}) => {
    return (
        <div>
            <Search addContentButton={addContentButton}/>
            <ContentGrid data={data}/>
        </div>
    );
};

export default ContentFeed;