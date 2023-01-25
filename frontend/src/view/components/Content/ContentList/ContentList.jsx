import React from 'react';
import styles from './list.module.scss'
import ItemChallenge from "../items/itemChallenge/ItemChallenge";

import path0 from '../../../../static/images/challenge-preview0.jpg'
import path1 from '../../../../static/images/challenge-preview1.jpg'
import path2 from '../../../../static/images/challenge-preview2.jpg'

const ContentList = ({content}) => {
    let bannerIndex = -1
    return (
        <div className={styles.flexContainer}>
            {content.challenges.map(itemInfo =>
            {
                bannerIndex += 1
                return <ItemChallenge key={itemInfo.challenge_id} itemInfo={itemInfo}/>
            }

            )}
        </div>
    );
};

export default ContentList;