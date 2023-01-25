import React, {useEffect} from 'react';
import styles from './post.module.scss'

import InfoBlockChallenge from "./InfoBlockChallenge";
import preview from '../../../static/images/preview1.jpg'

import {useLocation, useNavigate} from "react-router-dom";
import InfoBlockWithAuthors from "./InfoBlockWithAuthors";

const Post = ({postInfo, authorsInfo}) => {
    // TODO: вынести выбор инфо-блока в конфиг ContentFeed-а
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    let infoBlock;
    if (pathname === '/profile/challenges')
        infoBlock = <InfoBlockWithAuthors authorsInfo={authorsInfo}/>
    else infoBlock = <InfoBlockChallenge data={postInfo}/>

    useEffect(() => {
    }, [])

    function handleClick() {
        navigate('/post')
    }

    return (
        <div className={styles.postBox}>
            <img src={postInfo.data_link} alt={preview} className={styles.media} onClick={handleClick}/>
            {infoBlock}
        </div>
    );
};

export default Post;