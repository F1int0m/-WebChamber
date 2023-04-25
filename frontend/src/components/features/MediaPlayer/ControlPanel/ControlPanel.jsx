import React, {useState} from 'react';
import style from "./ControlPanel.module.scss";
import frameBack from "../../../../static/icons/gif-player/frameBack.svg";
import pause from "../../../../static/icons/gif-player/pause.svg";
import frameForward from "../../../../static/icons/gif-player/frameForward.svg";
import isLikedIcon from "../../../../static/icons/isLiked.svg";
import isNotLikedIcon from "../../../../static/icons/isNotLiked.svg";
import speed from "../../../../static/icons/gif-player/speed.svg";
import Meta from "./components/Meta/Meta";
import MoveBackButton from "./components/Controls/buttons/MoveBackButton";

const ControlPanel = (
    {
        onPlayCallback,
        onMoveBackCallback,
        onMoveForwardCallback
    }
) => {
    const [isLiked, setIsLiked] = useState(false)
    return (
        <div className={style.controlPanel}>
            <div className={style.timeline}/>
            <div className={style.playerContainer}>
                <div className={style.innerBox}>
                    <Meta
                        curTime={'0:00:33'}
                        limitTime={'0:02:00'}
                        curFrame={'08'}
                        limitFrame={'48'}
                    />
                    <div className={style.centralIconsGroup}>
                        <MoveBackButton callback={onMoveBackCallback}/>
                        <img src={pause} alt={''} onClick={onPlayCallback}/>
                        <img src={frameForward} alt={''} onClick={onMoveForwardCallback}/>
                        <span>+1f</span>
                    </div>
                    <div className={style.iconsGroup}>
                        {
                            isLiked
                                ? <img src={isLikedIcon} alt={''} onClick={setIsLiked}/>
                                : <img src={isNotLikedIcon} alt={''} onClick={setIsLiked}/>
                        }
                        <img src={speed} alt={''}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;