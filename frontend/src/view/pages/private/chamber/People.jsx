import React from 'react';
import ProfileBox from "../../../components/ProfileBox/ProfileBox";
import {info} from "../../../../system/fakeData";

const People = () => {
    // TODO: внедрить в ContentFeed
    return (
        <div>
            <ProfileBox isOpened={false} info={info}/>
            <ProfileBox isOpened={false} info={info}/>
            <ProfileBox isOpened={false} info={info}/>
            <ProfileBox isOpened={false} info={info}/>
        </div>
    );
};

export default People;