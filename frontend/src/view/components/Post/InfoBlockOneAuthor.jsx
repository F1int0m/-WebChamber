import React from 'react';

import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";
import AvatarImage from "../../../static/images/avatar.jpg";

const InfoBlockOneAuthor = ({data}) => {
    return (
        <div className={styles.infoBoxOneAuthor}>
            <img src={AvatarImage} alt={'avatar'}/>
            <div>
                <span className={styles.text}>{data.authorNickname}</span>
                <div className={styles.likes}>
                    <span className={styles.text}>{data.likes}</span>
                    <span><img src={LikesIcon} alt={'Likes'}/></span>
                </div>
            </div>
        </div>
    );
};

export default InfoBlockOneAuthor;