import React from 'react';
import style from "./profile.module.scss";
import AdditionalBox from "./AdditionalBox";
import ButtonsArea from "./ButtonsArea";

const InfoBox = ({isFull, info}) => {
    const nickname = 'Username'
    return (
        <div className={style.infoBox}>
            <div className={style.row1}>
                <span className={style.nickname}>
                    {nickname}
                </span>
                <ButtonsArea />
            </div>
            {
                isFull && <AdditionalBox info={info}/>
            }
        </div>
    );
};

export default InfoBox;