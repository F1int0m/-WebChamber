import React from 'react';

import style from './Source.module.scss'

const YtSource = ({source}) => {
    // Source example:
    // "http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
    return (
        <div>
            <iframe
                width="1156"
                height="684"
                src={source}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={style.container}
            >

            </iframe>
        </div>
    );
};

export default YtSource;