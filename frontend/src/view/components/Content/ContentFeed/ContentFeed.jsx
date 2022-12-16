import React from 'react';
import Search from "../../Search/Search";
import ContentGrid from "../ContentGrid/ContentGrid";
import ContentHeader from "../ContentHeader/ContentHeader";

const ContentFeed = ({addContentButton, data}) => {
    return (
        <div>
            <ContentHeader />
            <Search addContentButton={addContentButton}/>
            <ContentGrid data={data}/>
        </div>
    );
};

export default ContentFeed;