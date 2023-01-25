import React, {useEffect} from 'react';

import style from "./profileFull.module.scss"
import NotificationsIcon from '../../../static/icons/notifications_icon.svg'
import ButtonPrimary from "../buttons/ButtonPrimary"
import ButtonIcon from "../buttons/ButtonIcon"
import {useNavigate} from "react-router-dom";

const ButtonsArea = ({viewType}) => {
    // viewType: Preview / SelfPreview / Full / SelfFull

    const navigate = useNavigate()
    function handleEditButtonClick() {
        navigate('/profile/edit')
    }

    function handleSubscription() {
        console.log('subscribe')
    }

    return (
        <div className={style.buttonsArea}>
            {
                viewType === 'Preview' || viewType === 'Full' ?
                    <>
                        <ButtonIcon source={NotificationsIcon} alt={'Notifications'}/>
                        <ButtonPrimary text={'Подписаться'} callback={handleSubscription}/>
                    </>
                : viewType === 'SelfFull' ?
                    <>
                        <ButtonPrimary text={'Редактировать'} callback={handleEditButtonClick}/>
                    </>
                : <></>
            }
        </div>
    );
};

export default ButtonsArea;