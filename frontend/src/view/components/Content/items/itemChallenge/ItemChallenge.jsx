import React from 'react';
import style from './ItemChallenge.module.scss'

// import path from '../../../../../static/images/challenge-preview0.jpg'
import PrimaryInfoBlock from "./PrimaryInfoBlock";
import SecondaryInfoBlock from "./SecondaryInfoBlock";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getChallenge} from "../../../../../store/reducers/challengeReducer";

const ItemChallenge = ({itemInfo}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleClick() {
        console.log('(5) updating challengeReducer')
        dispatch(getChallenge(itemInfo))
        navigate('/challenge')
    }

    return (
        <div className={style.container} onClick={handleClick}>
            <div className={style.flexContainer}>
                <PrimaryInfoBlock title={itemInfo.name} description={itemInfo.description}/>
                <SecondaryInfoBlock end_datetime={itemInfo.end_datetime} total_likes={itemInfo.total_likes}/>
            </div>
            <img src={itemInfo.background_link} className={style.backgroundImage} alt={''}/>
        </div>
    );
};

export default ItemChallenge;