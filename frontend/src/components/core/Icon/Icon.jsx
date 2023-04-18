import React from 'react';

const Icon = ({path_d, strokeWidth, width, height, viewBox, fill_color, stroke_color}) => {

    const path = <path
        d={path_d}
        stroke={stroke_color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    />

    return (
        <div>
            <svg
                width={width}
                height={height}
                viewBox={viewBox}
                fill={fill_color}
                xmlns="http://www.w3.org/2000/svg"
            >{path}</svg>
        </div>
    );
};

export default Icon;