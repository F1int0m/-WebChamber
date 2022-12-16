import React from 'react';
import {NavLink} from "react-router-dom";
import {CASUAL_URL, CHALLENGES_URL, PROFILE_URL, ROOT_URL} from "../../../../system/env";
import style from "./style.module.scss"

const ContentHeader = () => {
    return (
        <header className={style.box}>
            <NavLink to={ROOT_URL + PROFILE_URL + CHALLENGES_URL} className={style.nav}>Челленджи</NavLink>
            <NavLink to={ROOT_URL + PROFILE_URL + CASUAL_URL} className={style.nav}>Все работы</NavLink>
        </header>
    );
};

export default ContentHeader;