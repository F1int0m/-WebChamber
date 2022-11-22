import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                <h1>
                    <NavLink to={'/content/challenges'}>Chamber</NavLink>
                    <NavLink to={'/favourites'}>Избранное</NavLink>
                    <NavLink to={'/settings'}>Настройки</NavLink>
                    <NavLink to={'/profile/me'}>Профиль</NavLink>
                </h1>
            </header>

            <Outlet/>

            <footer>

            </footer>
            
        </div>
    );
};

export default Layout;