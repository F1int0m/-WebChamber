import React from 'react';
import Post from "../../Post/Post";
import styles from './grid.module.scss'
// import {useSelector} from "react-redux";

const ContentGrid = ({data}) => {
    // console.log('(9-17) got store data: ', data)

    const authorInfo = {}
    // const authorInfo = useSelector(state => state.profile)
    // ^ Зачем вызывать автора одного поста над массивом всех постов?
    return (
        <div className={styles.flexContainer}>
            {data.map(postInfo =>
                <Post key={postInfo.post_id} postInfo={postInfo} authorsInfo={authorInfo}/>
            )}
        </div>
    );
};

export default ContentGrid;