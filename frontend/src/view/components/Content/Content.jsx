import React from 'react';
import ContentFeed from "./ContentFeed/ContentFeed";

const Content = ({type, data}) => {
    return (
        <div>
            {type==='casual-chamber' &&
            <ContentFeed
                addContentButton={true}
                data={data}
            />}
            {type==='challenges-chamber' &&
            <ContentFeed
                addContentButton={false}
                data={data}
            />}
            {type==='challenge' &&
            <ContentFeed
                addContentButton={true}
                data={data}
            />}
            {type==='casual-userReducer' &&
            <ContentFeed
                addContentButton={false}
                data={data}
            />}
            {type==='casual-userReducer-me' &&
            <ContentFeed
                addContentButton={true}
                data={data}
            />}
            {type==='challenges-userReducer' &&
            <ContentFeed
                addContentButton={false}
                data={data}
            />}
            {type==='casual-favourites' &&
            <ContentFeed
                addContentButton={true}
                data={data}
            />}
            {type==='challenges-favourites' &&
            <ContentFeed
                addContentButton={false}
                data={data}
            />}
        </div>
    );
};

export default Content;