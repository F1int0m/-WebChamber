import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                <NavLink to={'/'}>Chamber</NavLink>
                <NavLink to={'/favourites'}>Избранное</NavLink>
                <NavLink to={'/settings'}>Настройки</NavLink>
                <NavLink to={'/profile/me'}>Профиль</NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>

            </footer>
            
        </div>
    );
};

export default Layout;