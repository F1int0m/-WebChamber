import React from 'react';
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import {info} from "../../components/ProfileBox/data";
import {NavLink, Outlet} from "react-router-dom";
import {
    ROOT_URL,
    PROFILE_URL,
    CHALLENGES_URL,
    CASUAL_URL
} from "../../../system/env";

const Profile = () => {
    return (
        <div>
            <ProfileBox isFull={true} info={info}/>
            <header>
                <h1>
                    <NavLink to={ROOT_URL + PROFILE_URL + CHALLENGES_URL}>Челленджи</NavLink>
                    <NavLink to={ROOT_URL + PROFILE_URL + CASUAL_URL}>Все работы</NavLink>
                </h1>
            </header>
            <Outlet />
        </div>
    );
};

export default Profile;