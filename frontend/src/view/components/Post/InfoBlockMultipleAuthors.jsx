import React from 'react';

const InfoBlockMultipleAuthors = ({data}) => {
    return (
        <div>
            <h3>{data.title}</h3>
            {data.authors.map(author =>
                <div key={author.authorId}>
                    <p>{author.avatar}</p>
                    <p>{author.authorNickname}</p>
                </div>
            )}
            <p>{data.likes}</p>
        </div>
    );
};

export default InfoBlockMultipleAuthors;