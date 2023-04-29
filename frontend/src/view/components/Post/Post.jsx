import React, {useEffect, useState} from 'react';
import styles from './post.module.scss'

import InfoBlockChallenge from "./InfoBlockChallenge";
import preview from '../../../static/images/preview1.jpg'

import {useNavigate} from "react-router-dom";
// import InfoBlockWithAuthors from "./InfoBlockWithAuthors";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../../store/reducers/postReducer";
import post_filtered_list from "../../../actions/post/post_filtered_list";
// import {getUser} from "../../../store/reducers/userReducer";
// import {getChallenge} from "../../../store/reducers/challengeReducer";

const Post = ({postInfo, authorsInfo}) => {
    // TODO: вынести выбор инфо-блока в конфиг ContentFeed-а
    // TODO: реализовать показ автора(-ов)

    const navigate = useNavigate()
    // const location = useLocation()
    // const pathname = location.pathname
    const dispatch = useDispatch()
    // const userInfo = useSelector(state => state.profile)

    // let infoBlock;
    // if (pathname === '/profile/challenges')
    //     infoBlock = <InfoBlockChallenge postInfo={postInfo}/>
    // else infoBlock = <InfoBlockWithAuthors authorsInfo={authorsInfo} postInfo={postInfo}/>

    function handleClick() {
        // console.log('(10) updating postReducer')
        const user_id = postInfo.author_ids[0]
        dispatch(getPost(postInfo))
        post_filtered_list(dispatch, {
            user_id: user_id
        }).then()
        navigate('/post')
        // dispatch(getUser(authorsInfo))
        // post_filtered_list(dispatch, userInfo).then()
    }

    return (
        <div className={styles.postBox}>
            {
                <img src={postInfo.data_link} alt={preview} className={styles.media} onClick={handleClick}/>
            }
            {/*{infoBlock}*/}
        </div>
    );
};

export default Post;