import React from 'react';

import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";
import AvatarImage from "../../../static/images/avatar.jpg";

const InfoBlockMultipleAuthors = ({data}) => {
    return (
        <div className={styles.box}>
            <span className={styles.text}>{data.title}</span>
            <div className={styles.likes}>
                <span className={styles.text}>{data.likes}</span>
                <span><img src={LikesIcon} alt={'Likes'}/></span>
            </div>
            <select>
                <option disabled selected>Авторы</option>
                {data.authors.map(author =>
                    <option key={author.authorId}>
                        <img src={AvatarImage} alt={'avatar'}/>
                        <span className={styles.text}>{author.authorNickname}</span>
                    </option>
                )}
            </select>
        </div>
    );
};

export default InfoBlockMultipleAuthors;