import React from 'react';
import Post from "../Post/Post";

const ContentGrid = ({data}) => {
    console.log(data)
    return (
        <div>
            {data.map(postInfo =>
                <Post key={postInfo.id} data={postInfo}/>
            )}
        </div>
    );
};

export default ContentGrid;