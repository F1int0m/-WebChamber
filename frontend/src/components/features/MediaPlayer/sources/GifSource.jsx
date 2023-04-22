import React, {useEffect, useState} from 'react';

import style from './Sourse.module.scss'
import ControlPanel from "../ControlPanel/ControlPanel";
import Loader from "../../../../view/components/Loader/Loader";

const GifSource = ({source}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function handleLoading() {
            await new Promise(r => setTimeout(r, 1500));
            setIsLoading(false)
        }
        handleLoading().then()
    }, [])

    return (
        <div className={style.mainContainer}>
            <div className={style.gifBox}>
                {isLoading ?
                    <Loader/>
                    :
                    <img src={source} alt={'gif-file'} className={style.container}/>
                }
            </div>
            <ControlPanel/>
        </div>
    );
};

export default GifSource;