import React, {useEffect, useState} from 'react';
import styles from "./post.module.scss";
import LikesIcon from "../../../static/icons/likes.svg";
import {useDispatch, useSelector} from "react-redux";
import challenge_get from "../../../actions/challenge/challenge_get";

const InfoBlockChallenge = ({postInfo}) => {
    const dispatch = useDispatch()
    const challenge = useSelector(state => state.challenge)

    useEffect(() => {
        challenge_get(dispatch, {
            challenge_id: postInfo.challenge_id
        })
    }, [])

    return (
        <div className={styles.infoBoxChallenge}>
            <span className={styles.text}>{challenge.name}</span>
            <div className={styles.likes}>
                <span className={styles.text}>{postInfo.likes_count}</span>
                <span><img src={LikesIcon} alt={'Likes'}/></span>
            </div>
        </div>
    );
};

export default InfoBlockChallenge;