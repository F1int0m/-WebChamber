import React from 'react';
import Post from "../../Post/Post";
import styles from './grid.module.scss'
import {useDispatch, useSelector} from "react-redux";
import user_get from "../../../../actions/user/user_get";

const ContentGrid = ({data}) => {
    const dispatch = useDispatch()
    const authorInfo = useSelector(state => state.profile)
    return (
        <div className={styles.flexContainer}>
            {data.map(postInfo => {
                // TODO: добавить обработку нескольких авторов
                const user_id = postInfo.author_ids[0].toString()
                user_get(dispatch, user_id).then()
                return <Post key={postInfo.post_id} postInfo={postInfo} authorsInfo={authorInfo}/>
            })}
        </div>
    );
};

export default ContentGrid;