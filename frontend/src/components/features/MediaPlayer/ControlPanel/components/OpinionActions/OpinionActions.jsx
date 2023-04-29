import React, {useState} from 'react';
import isLikedIcon from "../../../../../../static/icons/isLiked.svg";
import isNotLikedIcon from "../../../../../../static/icons/isNotLiked.svg";
import speed from "../../../../../../static/icons/gif-player/speed.svg";

import style from './OpinionActions.module.scss'

const OpinionActions = () => {
    const [isLiked, setIsLiked] = useState(false)
    return (
        <div className={style.box}>
            {
                isLiked
                    ? <img src={isLikedIcon} alt={''} onClick={setIsLiked}/>
                    : <img src={isNotLikedIcon} alt={''} onClick={setIsLiked}/>
            }
            <img src={speed} alt={''}/>
        </div>
    );
};

export default OpinionActions;