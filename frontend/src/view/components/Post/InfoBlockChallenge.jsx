import React from 'react';
import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";

const InfoBlockChallenge = ({data}) => {
    return (
        <div className={styles.box}>
            <span className={styles.text}>{data.title}</span>
            <div className={styles.likes}>
                <span className={styles.text}>{data.likes}</span>
                <span><img src={LikesIcon} alt={'Likes'}/></span>
            </div>
        </div>
    );
};

export default InfoBlockChallenge;