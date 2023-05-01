import React, {useEffect, useState} from 'react';
import style from './Meta.module.scss'

const Meta = ({duration, durFrames, curFrame, meta, isPlaying}) => {
    // обновляет номер текущего кадра
    // возможна погрешность в отображении после использования +1f и -1f кнопок

    // const [curTime, setCurTime] = useState(0)
    // const [curFrame, setCurFrame] = useState(meta.get_current_frame())
    // // const delay = Math.round(duration/meta.get_length())+1
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCurFrame(meta.get_current_frame())
    //     }, 52)
    // })
    return (
        <div className={style.meta}>
            <div>
                <span>{curFrame} : {durFrames}f</span>
            </div>
            {/*<div>*/}
            {/*    <span>{curTime} : {duration}ms</span>*/}
            {/*</div>*/}
        </div>
    );
};

export default Meta;