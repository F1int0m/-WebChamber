import React, {useState} from 'react';
import style from "./ControlPanel.module.scss";
import Meta from "./components/Meta/Meta";
import Controls from "./components/Controls/Controls";
import OpinionActions from "./components/OpinionActions/OpinionActions";

const ControlPanel = (
    {
        isLoaded,
        onPlayCallback,
        isPlaying,
        onMoveBackCallback,
        onMoveForwardCallback,
        metaSuperGif,
        dur,
        durFrs,
        curFr
    }
) => {

    return (
        <div className={style.controlPanel}>
            <div className={style.timeline}/>
            {
                isLoaded ?
                    <div className={style.playerContainer}>
                        <Meta duration={dur}
                              durFrames={durFrs}
                              curFrame={curFr}
                              isPlaying={isPlaying}
                              meta={metaSuperGif}
                        />
                        <Controls onMoveBack={onMoveBackCallback}
                                  onPlayPause={onPlayCallback}
                                  isPlaying={isPlaying}
                                  onMoveForward={onMoveForwardCallback}
                        />
                        <OpinionActions />
                    </div>
                    :
                    <div className={style.playerContainer}/>
            }

        </div>
    );
};

export default ControlPanel;