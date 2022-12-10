import React from 'react';

const Post = ({data}) => {
    let post;
    if (data.type === 'challenge') {
        post = <div>
            <p>{data.previewImage}</p>
            <h3>{data.title}</h3>
            <p>{data.likes}</p>
        </div>
    } else if (data.type === 'one-author') {
        post = <div>
            <p>{data.previewImage}</p>
            <p>{data.avatar}</p>
            <h3>{data.authorNickname}</h3>
            <p>{data.likes}</p>
        </div>
    } else if (data.type === 'multiple-authors') {
        post = <div>
            <p>{data.previewImage}</p>
            <h3>{data.title}</h3>
            {data.authors.map(author =>
                <div key={author.authorId}>
                    <p>{author.avatar}</p>
                    <p>{author.authorNickname}</p>
                </div>
            )}
            <p>{data.likes}</p>
        </div>
    }
    return (
        <div>
            {post}
        </div>
    );
};

export default Post;