import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {
    CHALLENGES_URL,
    CHAMBER_URL,
    COLLABORATIONS_URL,
    ROOT_URL,
    TOPS_URL
} from "../../../system/env";

const ChamberHeader = () => {
    return (
        <div>
            <header>
                <h2>
                    <NavLink to={ROOT_URL + CHAMBER_URL + CHALLENGES_URL}>Челленджи</NavLink>
                    <NavLink to={ROOT_URL + CHAMBER_URL + COLLABORATIONS_URL}>Коллаборации</NavLink>
                    <NavLink to={ROOT_URL + CHAMBER_URL + TOPS_URL}>Топ работ</NavLink>
                </h2>
            </header>
            <Outlet/>
        </div>
    );
};

export default ChamberHeader;