import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {
    ROOT_URL,
    LOGIN_URL,
    PROFILE_URL,
    SETTINGS_URL,
    CHALLENGES_URL,
    FAVOURITES_URL,
    CHAMBER_URL
} from "../../../system/env";

const MainHeader = () => {
    return (
        <div>
            <header>
                <h1>
                    <NavLink to={ROOT_URL + CHAMBER_URL + CHALLENGES_URL}>Chamber</NavLink>
                    <NavLink to={ROOT_URL + FAVOURITES_URL}>Избранное</NavLink>
                    <NavLink to={ROOT_URL + SETTINGS_URL}>Настройки</NavLink>
                    <NavLink to={ROOT_URL + PROFILE_URL + CHALLENGES_URL}>Профиль</NavLink>
                    <NavLink to={ROOT_URL + LOGIN_URL}>Logout</NavLink>
                </h1>
            </header>
            <Outlet/>
            <footer>
            </footer>
        </div>
    );
};

export default MainHeader;