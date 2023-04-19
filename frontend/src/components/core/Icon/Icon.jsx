import React from 'react';
import style from './Icon.module.scss'

const Icon = ({
                  source,
                  fill_color,
                  stroke_color
}) => {

    return (
        <div>
            <img src={source} alt={'icon'} className={style.icon}/>
        </div>
    );
};

export default Icon;