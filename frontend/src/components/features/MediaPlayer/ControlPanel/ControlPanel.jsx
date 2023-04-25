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
import MoveForwardButton from "./components/Controls/buttons/MoveForwardButton";
import Controls from "./components/Controls/Controls";

const ControlPanel = (
    {
        onPlayCallback,
        isPlaying,
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
                    <Controls
                        onMoveBack={onMoveBackCallback}
                        onPlayPause={onPlayCallback}
                        isPlaying={isPlaying}
                        onMoveForward={onMoveForwardCallback}
                    />
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