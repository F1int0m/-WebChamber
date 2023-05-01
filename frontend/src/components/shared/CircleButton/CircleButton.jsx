import React from 'react';
import style from './CircleButton.module.scss'

const CircleButton = ({icon, callback}) => {
    return (
        <div className={style.box} onClick={callback}>
            {/*<div className={style.boxIcon}>*/}
            {/*    <img src={icon} alt={'icon'}/>*/}
            {/*</div>*/}
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" className={style.circleBody}/>
                {icon}
            </svg>
        </div>
    );
};

export default CircleButton;