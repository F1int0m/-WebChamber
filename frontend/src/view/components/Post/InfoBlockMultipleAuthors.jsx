import React from 'react';

import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";
import AuthorsList from "./authorsList";

const InfoBlockMultipleAuthors = ({data}) => {
    return (
        <div className={styles.infoBoxMultipleAuthors}>
            <span className={styles.text}>{data.title}</span>
            <div className={styles.likesWithAuthors}>
                <div className={styles.likes}>
                    <span className={styles.text}>{data.likes}</span>
                    <span><img src={LikesIcon} alt={'Likes'}/></span>
                </div>
                <AuthorsList authors={data.authors}/>
            </div>
        </div>
    );
};

export default InfoBlockMultipleAuthors;