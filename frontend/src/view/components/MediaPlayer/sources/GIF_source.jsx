import React from 'react';
// import path from '../../../../static/gifs/post.gif'
// import {SuperGif} from '../../../../system/libgif-js-master/libgif'

import style from './sourse.module.scss'
import pause from '../../../../static/icons/gif-player/pause.svg'
import frameBack from '../../../../static/icons/gif-player/frameBack.svg'
import frameForward from '../../../../static/icons/gif-player/frameForward.svg'
import speed from '../../../../static/icons/gif-player/speed.svg'

const GifSource = ({source}) => {
    //let sup1 = new SuperGif({gif: document.getElementById('example1')} );
    //sup1.load();

    // console.log('source: ', source)
    return (
        <div className={style.mainContainer}>
            <img src={source} alt={'gif-file'} className={style.container}/>
            <div className={style.playerContainer}>
                <img src={pause} alt={''}/>
                <div>
                    <img src={frameBack} alt={''}/>
                    <img src={frameForward} alt={''}/>
                </div>
                <img src={speed} alt={''}/>
            </div>
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
        </div>
    );
};

export default GifSource;