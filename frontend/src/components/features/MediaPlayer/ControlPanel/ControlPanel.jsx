import React, {useState} from 'react';
import style from "./ControlPanel.module.scss";
import Meta from "./components/Meta/Meta";
import Controls from "./components/Controls/Controls";
// import SuperGif from "libgif";
// import source from "../sources/legs.gif";
import OpinionActions from "./components/OpinionActions/OpinionActions";

const ControlPanel = (
    {
        // onPlayCallback,
        // isPlaying,
        // onMoveBackCallback,
        // onMoveForwardCallback,
        // img_tag,
        // super_gif
    }
) => {
    const [isPlaying, setIsPlaying] = useState(false)

    // console.log('show img_tag src:', img_tag)
    // super_gif.load_url(source); // always first after creating

    function onPlayCallback() {
        // if(super_gif.get_playing()) {
        //     super_gif.pause()
        //     setIsPlaying(false)
        // }
        // else {
        //     super_gif.play()
        //     setIsPlaying(true)
        // }
    }

    function onMoveForwardCallback() {
        // const cur_frame = super_gif.get_current_frame()
        // const limit = super_gif.get_length()
        // if (cur_frame < limit) {
        //     super_gif.move_to(cur_frame+1)
        // }
    }

    function onMoveBackCallback() {
        // const cur_frame = super_gif.get_current_frame()
        // if (cur_frame > 0) {
        //     super_gif.move_to(cur_frame-1)
        // }
    }

    return (
        <div className={style.controlPanel}>
            <div className={style.timeline}/>
            <div className={style.playerContainer}>
                <Meta curTime={'0:00:33'}
                      limitTime={'0:02:00'}
                      curFrame={'08'}
                      limitFrame={'48'}
                />
                <Controls onMoveBack={onMoveBackCallback}
                          onPlayPause={onPlayCallback}
                          isPlaying={isPlaying}
                          onMoveForward={onMoveForwardCallback}
                />
                <OpinionActions />
            </div>
        </div>
    );
};

export default ControlPanel;