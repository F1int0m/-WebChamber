import React from 'react';
import ButtonCustom from "../../../../../../shared/ButtonCustom/ButtonCustom";
import {rectRightIconLight} from "../../../../../../shared/Icons";

import style from "./buttons.module.scss";

const MoveForwardButton = ({callback}) => {
    return (
        <div className={style.box}>
            <ButtonCustom
                icon={rectRightIconLight}
                styleType={'player'}
                callback={callback}/>
            <span>+1f</span>
        </div>
    );
};

export default MoveForwardButton;