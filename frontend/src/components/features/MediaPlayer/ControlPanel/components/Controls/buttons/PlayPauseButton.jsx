import React from 'react';
import {playIconLight, stopIconLight} from "../../../../../../shared/Icons";
import CircleButton from "../../../../../../shared/CircleButton/CircleButton";

const PlayPauseButton = ({callback, isPlaying}) => {
    const cur_icon = isPlaying ? stopIconLight : playIconLight;
    return (
        <div>
            <CircleButton icon={cur_icon} callback={callback}/>
        </div>
    );
};

export default PlayPauseButton;