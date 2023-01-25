import React from 'react';
import path from '../../../../static/gifs/post.gif'
//import {SuperGif} from '../../../../system/libgif-js-master/libgif'

const GifSource = ({source}) => {
    //let sup1 = new SuperGif({gif: document.getElementById('example1')} );
    //sup1.load();

    console.log('source: ', source)
    return (
        <div>
            <img src={source} alt={'gif-file'}/>
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