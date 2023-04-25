import React, {useEffect, useState} from 'react';

import style from './Sourse.module.scss'
import ControlPanel from "../ControlPanel/ControlPanel";
// import Loader from "../../../../view/components/Loader/Loader";

import SuperGif from 'libgif';
import source from './legs.gif'

// TODO: update webpack from 5 to 5.75+
// Cross-realm object access in Webpack 5 - https://github.com/advisories/GHSA-hc6q-2mpp-qw7j
// - appears after installing libgif

const GifSource = (source0) => {
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        async function handleLoading() {
            await new Promise(r => setTimeout(r, 1500));
            setIsLoading(false)
        }
        handleLoading().then()
    }, [])



    const img_tag = document.getElementById('img_source')
    let super_gif = new SuperGif({
        gif: img_tag,
        auto_play: 0,
        max_width: 1120,
        draw_while_loading: true,
        show_progress_bar: false,
        // progressbar_height: 8,
        // progressbar_background_color: '#4E4C54',
        // progressbar_foreground_color: '#905DCC'
    });
    super_gif.load_url(source); // always first after creating

    const [isPlaying, setIsPlaying] = useState(false)

    function gifPlay() {
        if(super_gif.get_playing()) {
            super_gif.pause()
            setIsPlaying(false)
        }
        else {
            super_gif.play()
            setIsPlaying(true)
        }
    }

    function gifMoveForward() {
        const cur_frame = super_gif.get_current_frame()
        const limit = super_gif.get_length()
        if (cur_frame < limit) {
            super_gif.move_to(cur_frame+1)
        }
    }

    function gifMoveBack() {
        const cur_frame = super_gif.get_current_frame()
        if (cur_frame > 0) {
            super_gif.move_to(cur_frame-1)
        }
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.gifBox}>
                <img alt={'gif-file'} className={style.container} id={'img_source'} src={source}/>
                {/*{isLoading ?*/}
                {/*    <Loader/>*/}
                {/*    :*/}
                {/*    <img src={source} alt={'gif-file'} className={style.container} id={'img-source'}/>*/}
                {/*}*/}
            </div>
            <ControlPanel
                onPlayCallback={gifPlay}
                isPlaying={isPlaying}
                onMoveForwardCallback={gifMoveForward}
                onMoveBackCallback={gifMoveBack}
            />

        </div>
    );
};

export default GifSource;