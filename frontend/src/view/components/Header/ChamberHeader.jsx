import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {
    CHALLENGES_URL,
    CHAMBER_URL,
    COLLABORATIONS_URL,
    ROOT_URL,
} from "../../../system/env";

import styles from '../../style/App.module.css'

const ChamberHeader = () => {
    return (
        <div className={styles.App}>
            <header>
                <h2>
                    <NavLink to={ROOT_URL + CHAMBER_URL + CHALLENGES_URL}>Челленджи</NavLink>
                    <NavLink to={ROOT_URL + CHAMBER_URL + COLLABORATIONS_URL}>Все работы</NavLink>
                    <NavLink to={ROOT_URL + CHAMBER_URL + 'people'}>Люди</NavLink>
                </h2>
            </header>
            <Outlet/>
        </div>
    );
};

export default ChamberHeader;