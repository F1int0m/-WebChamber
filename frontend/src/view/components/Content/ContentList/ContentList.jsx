import React from 'react';
import styles from './list.module.scss'
import ItemChallenge from "../items/itemChallenge/ItemChallenge";

const ContentList = ({content}) => {
    return (
        <div className={styles.flexContainer}>
            {content.challengeList.map(itemInfo =>
                <ItemChallenge key={itemInfo.challenge_id} itemInfo={itemInfo}/>
            )}
        </div>
    );
};

export default ContentList;