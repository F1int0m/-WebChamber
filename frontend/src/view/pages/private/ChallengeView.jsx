import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import ChallengeInfoBanner from "../../components/ChallengeInfoBanner/ChallengeInfoBanner";
import ContentFeed from "../../components/Content/ContentFeed/ContentFeed";

const ChallengeView = () => {
    const challengeInfo = useSelector(state => state.challenge)
    console.log('(selected) challengeInfo: ', challengeInfo)

    useEffect(() => {

    }, [])

    return (
        <div>
            <ChallengeInfoBanner itemInfo={challengeInfo}/>
            <ContentFeed pageType={'challenge'} data={{
                challenge_id: challengeInfo.challenge_id
            }}/>
        </div>
    );
};

export default ChallengeView;