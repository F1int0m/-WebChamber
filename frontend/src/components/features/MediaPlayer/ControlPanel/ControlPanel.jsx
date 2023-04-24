import React, {useState} from 'react';
import style from "./ControlPanel.module.scss";
import frameBack from "../../../../static/icons/gif-player/frameBack.svg";
import pause from "../../../../static/icons/gif-player/pause.svg";
import frameForward from "../../../../static/icons/gif-player/frameForward.svg";
import isLikedIcon from "../../../../static/icons/isLiked.svg";
import isNotLikedIcon from "../../../../static/icons/isNotLiked.svg";
import speed from "../../../../static/icons/gif-player/speed.svg";

const ControlPanel = (
    {
        onPlayCallback,
        onMoveBackCallback,
        onMoveForwardCallback
    }
) => {

    // Пример взаимодействия с либой
    {/*
            <img id="example1" src={path}
                 WCGIFAutoPlay={"0"} width="467" height="375" alt={'gif-file'}/>
            <br/>
            <a href="javascript:" onMouseDown="sup1.pause(); return false;">Pause </a>
            <a href="javascript:" onMouseDown="sup1.play(); return false;">Play </a>
            <a href="javascript:" onMouseDown="sup1.move_to(0); return false;">Restart </a>
            <a href="javascript:" onMouseDown="sup1.move_relative(1); return false;">forward </a>
            <a href="javascript:" onMouseDown="sup1.move_relative(-1); return false;">back</a>
            */}
    //

    const [isLiked, setIsLiked] = useState(false)
    return (
        <div className={style.controlPanel}>
            <div className={style.timeline}/>
            <div className={style.playerContainer}>
                <div className={style.innerBox}>
                    <div className={style.meta}>
                        <div>
                            <span>0:00:33 - 0:02:00</span>
                        </div>
                        <div>
                            <span>08 / 48f</span>
                        </div>
                    </div>
                    <div className={style.centralIconsGroup}>
                        <span>-1f</span>
                        <img src={frameBack} alt={''} onClick={onMoveBackCallback}/>
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