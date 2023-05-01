import React, {useState} from 'react';
import isLikedIcon from "../../../../../../static/icons/isLiked.svg";

import style from './OpinionActions.module.scss'
import CircleButton from "../../../../../shared/CircleButton/CircleButton";

const OpinionActions = () => {
    const [isLiked, setIsLiked] = useState(false)
    return (
        <div className={style.box}>
            <CircleButton icon={isLikedIcon}/>
        </div>
    );
};

export default OpinionActions;