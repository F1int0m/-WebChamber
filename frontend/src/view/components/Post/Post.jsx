import React from 'react';
import styles from './post.module.scss'

import PreviewImage1 from "../../../static/images/preview1.jpg"

import InfoBlockChallenge from "./InfoBlockChallenge";
import InfoBlockOneAuthor from "./InfoBlockOneAuthor";
import InfoBlockMultipleAuthors from "./InfoBlockMultipleAuthors";

const Post = ({data}) => {
    let infoBlock;
    if (data.type === 'challenge') {
        infoBlock = <InfoBlockChallenge data={data}/>
    } else if (data.type === 'one-author') {
        infoBlock = <InfoBlockOneAuthor data={data}/>
    } else if (data.type === 'multiple-authors') {
        infoBlock = <InfoBlockMultipleAuthors data={data}/>
    }
    return (
        <div className={styles.postBox}>
            <img src={PreviewImage1} alt={'preview'} className={styles.media}/>
            {infoBlock}
        </div>
    );
};

export default Post;