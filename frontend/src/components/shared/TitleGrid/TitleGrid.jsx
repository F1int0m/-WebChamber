import React from 'react';
import style from "./TitleGrid.module.scss";

const TitleGrid = ({content}) => {
    return (
        <div className={style.title}>
            <h2>{content}</h2>
        </div>
    );
};

export default TitleGrid;