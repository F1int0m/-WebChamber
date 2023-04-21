import React from 'react';

import style from "./profileFull.module.scss"
import NotificationsIcon from '../../../static/icons/notifications_icon.svg'
import ButtonPrimary from "../buttons/ButtonPrimary"
import ButtonIcon from "../buttons/ButtonIcon"
import {useNavigate} from "react-router-dom";
// import user_subscribe from "../../../actions/user/user_subscribe";
// import {useDispatch, useSelector} from "react-redux";
import Subscription from "../../../components/features/Subscription/Subscription";

const ButtonsArea = ({viewType}) => {
    // viewType: Preview / SelfPreview / Full / SelfFull

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const user_id = useSelector(state => state.profile.user_id)
    // const [isClicked, setIsClicked] = useState(false)

    function handleEditButtonClick() {
        navigate('/profile/edit')
    }

    // function handleSubscription() {
    //     // user_subscribe(dispatch, user_id).then()
    //     console.log('subscribe')
    //     setIsClicked(true)
    // }

    return (
        <div className={style.buttonsArea}>
            {
                viewType === 'Preview' || viewType === 'Full' ?
                    <>
                        <ButtonIcon source={NotificationsIcon} alt={'Notifications'}/>
                        <Subscription/>
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