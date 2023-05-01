import React, {useEffect, useState} from 'react';

import style from './Source.module.scss'
import ControlPanel from "../ControlPanel/ControlPanel";
// import Loader from "../../../../view/components/Loader/Loader";

import SuperGif from 'libgif';
import source from './legs.gif'

// TODO: update webpack from 5 to 5.75+
// Cross-realm object access in Webpack 5 - https://github.com/advisories/GHSA-hc6q-2mpp-qw7j
// - appears after installing libgif

const GifSource = (source0) => {
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     async function handleLoading() {
    //         await new Promise(r => setTimeout(r, 1500));
    //         setIsLoading(false)
    //     }
    //     handleLoading().then()
    // }, [])

    // const img_tag0 = <img src={source} alt={'gif-file'} className={style.container} id={'img_source'}/>

    const [superGif, setSuperGif] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const [dur, setDur] = useState(0)
    const [durFrs, setDurFrs] = useState(0)
    const [curFrame, setCurFrame] = useState(0)

    useEffect(() => {
        // Загружаем super_gif ПОСЛЕ рендера тегов

        const img_tag = document.getElementById('img_source')
        const super_gif = new SuperGif({
            gif: img_tag,
            auto_play: false,
            max_width: 1200,
            // vp_l: 0,
            // vp_t: 0,
            // vp_w: 1120,
            // vp_h: 615,
            // c_w: 1120,
            // c_h: 615
        });
        super_gif.load(() => {
            super_gif.pause()
            // super_gif.c_w = 1120
            // super_gif.c_h = 615
            setIsLoaded(true)
            setSuperGif(super_gif)
            setDur(super_gif.get_duration())
            setDurFrs(super_gif.get_length())
        })
    }, [])

    // useEffect(() => {
    //     if (isLoaded) {
    //         setTimeout(() => {
    //             setCurFrame(superGif.get_current_frame())
    //         }, 42)
    //     }
    // })

    function gifPlay() {
        if(isLoaded && superGif.get_playing()) {
            superGif.pause()
            setIsPlaying(false)
        }
        else {
            superGif.play()
            setIsPlaying(true)
        }
    }

    function gifMoveForward() {
        const cur_frame = superGif.get_current_frame()
        const limit = superGif.get_length()
        if (cur_frame < limit) {
            superGif.move_to(cur_frame+1)
        }
    }

    function gifMoveBack() {
        const cur_frame = superGif.get_current_frame()
        if (cur_frame > 0) {
            superGif.move_to(cur_frame-1)
        }
    }
    return (
        <div className={style.mainContainer}>
            <div className={style.gifBox}>
                <img id={'img_source'} src={source} alt={'gif-file'} className={style.container}/>
                {/*{isLoading ?*/}
                {/*    <Loader/>*/}
                {/*    :*/}
                {/*    <img src={source} alt={'gif-file'} className={style.container} id={'img-source'}/>*/}
                {/*}*/}
            </div>
            <ControlPanel
                isLoaded={isLoaded}
                onPlayCallback={gifPlay}
                isPlaying={isPlaying}
                onMoveForwardCallback={gifMoveForward}
                onMoveBackCallback={gifMoveBack}
                dur={dur}
                durFrs={durFrs}
                curFr={curFrame}
                metaSuperGif={superGif}
            />
        </div>
    );
};

export default GifSource;