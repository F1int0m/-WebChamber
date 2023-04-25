import React from 'react';
import MoveBackButton from "./buttons/MoveBackButton";
import MoveForwardButton from "./buttons/MoveForwardButton";
import PlayPauseButton from "./buttons/PlayPauseButton";

import style from './Controls.module.scss'

const Controls = (
    {
        onMoveBack,
        onPlayPause,
        isPlaying,
        onMoveForward
    }) => {
    return (
        <div className={style.box}>
            <MoveBackButton callback={onMoveBack}/>
            <PlayPauseButton callback={onPlayPause}
                             isPlaying={isPlaying}/>
            <MoveForwardButton callback={onMoveForward}/>
        </div>
    );
};

export default Controls;