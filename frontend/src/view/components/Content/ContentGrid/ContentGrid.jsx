import React from 'react';
import Post from "../../Post/Post";
import styles from './grid.module.scss'

const ContentGrid = ({data}) => {
    return (
        <div className={styles.flexContainer}>
            {data.map(postInfo =>
                <Post key={postInfo.id} data={postInfo}/>
            )}
        </div>
    );
};

export default ContentGrid;