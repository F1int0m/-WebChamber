import React from 'react';
import ButtonCustom from "../../../../../../shared/ButtonCustom/ButtonCustom";
import {rectLeftIconLight} from "../../../../../../shared/Icons";

import style from './buttons.module.scss'

const MoveBackButton = ({callback}) => {
    return (
        <div className={style.box}>
            <span>-1f</span>
            <ButtonCustom icon={rectLeftIconLight} styleType={'player'} callback={callback}/>
        </div>
    );
};

export default MoveBackButton;