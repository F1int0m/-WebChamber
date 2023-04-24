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



    const img_tag = document.getElementById('img-source')

    if (img_tag) {
        console.log('found img:', img_tag)
        console.log('type of:', typeof  img_tag)

        let super_gif = new SuperGif({gif: img_tag});
        super_gif.load_url(source); // always first after creating
        // super_gif.pause();

    }
    else {
        console.log('err:', img_tag)

        console.log('img:', img_tag)
        console.log('type of:', typeof  img_tag)
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.gifBox}>
                <img  alt={'gif-file'} className={style.container} id={'img-source'}/>
                {/*{isLoading ?*/}
                {/*    <Loader/>*/}
                {/*    :*/}
                {/*    <img src={source} alt={'gif-file'} className={style.container} id={'img-source'}/>*/}
                {/*}*/}
            </div>
            <ControlPanel/>
        </div>
    );
};

export default GifSource;