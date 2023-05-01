import React from 'react';
import {rectRightIconLight, stopIconLight} from "../../../../../../shared/Icons";
import ButtonCustom from "../../../../../../shared/ButtonCustom/ButtonCustom";

const PlayPauseButton = ({callback, isPlaying}) => {
    const cur_icon = isPlaying ? stopIconLight : rectRightIconLight;
    return (
        <div>
            <ButtonCustom
                icon={cur_icon}
                styleType={'player'}
                callback={callback}/>
        </div>
    );
};

export default PlayPauseButton;