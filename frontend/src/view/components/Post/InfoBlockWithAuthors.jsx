import React from 'react';

const InfoBlockWithAuthors = ({authorsInfo}) => {
    console.log('InfoBlockWithAuthors - authorsInfo: ', authorsInfo)
    return (
        <div>
            {
                authorsInfo
            }
        </div>
    );
};

export default InfoBlockWithAuthors;