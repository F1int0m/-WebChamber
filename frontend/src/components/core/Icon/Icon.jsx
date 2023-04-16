import React from 'react';

const Icon = (source) => {
    const color = '#FFFFFF'
    return (
        <div>
            {/*<img src={source} alt={'icon'}/>*/}
            <svg width="20" height="24" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 15.5C9 15.5 1 11.0455 1 5.63637C1 4.68014 1.3332 3.75345 1.9429 3.01396C2.5526 2.27447 3.40114 1.76786 4.34416 1.58033C5.28717 1.3928 6.26641 1.53593 7.11525 1.98537C7.9641 2.43481 8.63012 3.16279 9 4.04546C9.36988 3.16279 10.0359 2.43481 10.8847 1.98537C11.7336 1.53593 12.7128 1.3928 13.6558 1.58033C14.5989 1.76786 15.4474 2.27447 16.0571 3.01396C16.6668 3.75345 17 4.68014 17 5.63637C17 11.0455 9 15.5 9 15.5Z" stroke={color} stroke-width="1.61905" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </div>
    );
};

export default Icon;