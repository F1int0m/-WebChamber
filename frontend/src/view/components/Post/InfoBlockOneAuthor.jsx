import React from 'react';

import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";
import AvatarImage from "../../../static/images/avatar.jpg";

const InfoBlockOneAuthor = ({authorsInfo, postInfo}) => {
    return (
        <div className={styles.infoBoxOneAuthor}>
            <img src={authorsInfo.avatar_link} alt={'avatar'}/>
            <div>
                <span className={styles.text}>{authorsInfo.nickname}</span>
                <div className={styles.likes}>
                    <span className={styles.text}>{postInfo.likes_count}</span>
                    <span><img src={LikesIcon} alt={'Likes'}/></span>
                </div>
            </div>
        </div>
    );
};

export default InfoBlockOneAuthor;