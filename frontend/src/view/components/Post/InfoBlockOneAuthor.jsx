import React from 'react';

const InfoBlockOneAuthor = ({data}) => {
    return (
        <div>
            <p>{data.avatar}</p>
            <h3>{data.authorNickname}</h3>
            <p>{data.likes}</p>
        </div>
    );
};

export default InfoBlockOneAuthor;