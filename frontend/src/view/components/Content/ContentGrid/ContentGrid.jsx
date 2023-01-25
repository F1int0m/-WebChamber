import React, {useEffect} from 'react';
import Post from "../../Post/Post";
import styles from './grid.module.scss'
import {useDispatch, useSelector} from "react-redux";
import user_get from "../../../../actions/user/user_get";

const ContentGrid = ({data}) => {
    const authorInfo = useSelector(state => state.profile)
    return (
        <div className={styles.flexContainer}>
            {data.map(postInfo =>
                <Post key={postInfo.post_id} postInfo={postInfo} authorsInfo={authorInfo}/>
            )}
        </div>
    );
};

export default ContentGrid;