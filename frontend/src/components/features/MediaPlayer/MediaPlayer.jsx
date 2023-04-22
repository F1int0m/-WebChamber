import React from 'react';
import YtSource from "./sources/YT_source";
import GifSource from "./sources/GifSource";

import style from './MediaPlayer.module.scss'

const MediaPlayer = ({source}) => {
    const is_external_source = false
    const yt_source = 'https://www.youtube.com/embed/wN63nyZy0Nk' // remove later

    return (
        <div className={style.container}>
            {is_external_source ?
                <YtSource source={yt_source}/>
                :
                <GifSource source={source}/>
            }
        </div>
    );
};

export default MediaPlayer;