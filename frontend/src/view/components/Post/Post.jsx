import React from 'react';
import styles from './post.module.scss'

import InfoBlockChallenge from "./InfoBlockChallenge";
import InfoBlockOneAuthor from "./InfoBlockOneAuthor";
import InfoBlockMultipleAuthors from "./InfoBlockMultipleAuthors";
import preview from '../../../static/images/preview1.jpg'

import {useNavigate} from "react-router-dom";

const Post = ({data}) => {
    // TODO: вынести выбор инфо-блока в конфиг ContentFeed-а
    const navigate = useNavigate()

    let infoBlock;
    if (data.type === 'challenge') {
        infoBlock = <InfoBlockChallenge data={data}/>
    } else if (data.type === 'one-author') {
        infoBlock = <InfoBlockOneAuthor data={data}/>
    } else if (data.type === 'multiple-authors') {
        infoBlock = <InfoBlockMultipleAuthors data={data}/>
    }

    function handleClick() {
        navigate('/post')
    }

    return (
        <div className={styles.postBox}>
            <img src={preview} alt={preview} className={styles.media} onClick={handleClick}/>
            {infoBlock}
        </div>
    );
};

export default Post;