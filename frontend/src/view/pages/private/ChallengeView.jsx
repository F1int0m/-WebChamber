import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from '../setupPages.module.scss'
import ContentFeed from "../../components/Content/ContentFeed/ContentFeed";
import ItemChallenge from "../../components/Content/items/itemChallenge/ItemChallenge";
import ChallengeInfoBanner from "../../components/ChallengeInfoBanner/ChallengeInfoBanner";
import post_filtered_list from "../../../actions/post/post_filtered_list";

const ChallengeView = () => {
    const challengeInfo = useSelector(state => state.challenge)
    console.log('(selected) challengeInfo: ', challengeInfo)
    const dispatch = useDispatch()
    const args = {}

    // useEffect(() => {
    //     post_filtered_list(dispatch, args)
    // }, [])

    return (
        <div className={style.setupChallengeView}>
            <ChallengeInfoBanner itemInfo={challengeInfo}/>
            <ContentFeed pageType={'challenge'}/>
        </div>
    );
};

export default ChallengeView;