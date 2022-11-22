import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const ChamberHeader = () => {
    return (
        <div>
            <header>
                <h1>
                    <NavLink to={'/content/challenges'}>Chamber</NavLink>
                    <NavLink to={'/favourites'}>Избранное</NavLink>
                    <NavLink to={'/settings'}>Настройки</NavLink>
                    <NavLink to={'/profile/me'}>Профиль</NavLink>
                    <NavLink to={'/login'}>Logout</NavLink>
                </h1>
                <h2>
                    <NavLink to={'/content/challenges'}>Челленджи</NavLink>
                    <NavLink to={'/content/collaborations'}>Коллаборации</NavLink>
                    <NavLink to={'/content/tops'}>Топ работ</NavLink>
                </h2>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default ChamberHeader;