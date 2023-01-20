import React, {useState} from 'react';
import YtSource from "./sources/YT_source";
import GifSource from "./sources/GIF_source";

import src from '../../../static/gifs/post.gif'
import Loader from "../Loader/Loader";

import style from './MediaPlayer.module.scss'

const MediaPlayer = () => {
    const is_external_source = true

    const [isLoading, setIsLoading] = useState(true)

    const yt_source = 'https://www.youtube.com/embed/wN63nyZy0Nk' // remove later
    const gif_source = src // remove later

    async function handleLoading() {
        await new Promise(r => setTimeout(r, 2000));
        setIsLoading(false)
    }

    // handleLoading()

    return (
        <div className={style.container}>
            {
                isLoading ?
                    <Loader /> : is_external_source ?
                            <YtSource source={yt_source}/>
                            :
                            <GifSource source={gif_source}/>
            }
        </div>
    );
};

export default MediaPlayer;