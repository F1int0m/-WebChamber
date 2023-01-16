import React from 'react';

import style from "./profileFull.module.scss"
import NotificationsIcon from '../../../static/icons/notifications_icon.svg'
import ButtonPrimary from "../buttons/ButtonPrimary"
import ButtonIcon from "../buttons/ButtonIcon"

const ButtonsArea = () => {
    return (
        <div className={style.buttonsArea}>
            <ButtonIcon source={NotificationsIcon} alt={'Notifications'}/>
            <ButtonPrimary text={'Подписаться'} callback={'callback'}/>
        </div>
    );
};

export default ButtonsArea;