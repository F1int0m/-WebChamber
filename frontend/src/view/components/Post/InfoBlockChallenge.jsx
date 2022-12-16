import React from 'react';
import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";

const InfoBlockChallenge = ({data}) => {
    return (
        <div className={styles.box}>
            <span className={styles.text}>{data.title}</span>
            <div className={styles.likes}>
                <span><img src={LikesIcon} alt={'Likes'}/></span>
                <span className={styles.text}>{data.likes}</span>
            </div>
        </div>
    );
};

export default InfoBlockChallenge;