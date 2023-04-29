import React from 'react';
import {NavLink, Outlet, useLocation} from "react-router-dom";

import {
    ROOT_URL,
    SETTINGS_URL,
    CHALLENGES_URL,
    FAVOURITES_URL,
    CHAMBER_URL,
    LOGIN_URL,
    PROFILE_PAGE
} from "../../../system/env";
import lightMode from './MainHeader.module.scss'
import darkMode from './DarkMainHeader.module.scss'

import NotificationsIcon from '../../../static/icons/notifications_icon.svg'
import SettingsIcon from '../../../static/icons/settings_icon.svg'
import ProfileIcon from '../../../static/icons/profile_icon.svg'
import logo from '../../../static/images/logo.png'
import user_get_self from "../../../actions/user/user_get_self";
import {useDispatch} from "react-redux";


const MainHeader = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const style = location.pathname.toString() === '/post' ? darkMode : lightMode

    function handleProfileSelfClick() {
        user_get_self(dispatch).then()
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <header className={style.header}>
                    {/*<div className={style.leftNavBox}>*/}
                    {/*    <img src={logo} alt={'logo'} width={80} height={80}/>*/}
                    {/*</div>*/}
                    <div className={style.mainNavBox}>
                        <NavLink to={ROOT_URL + CHAMBER_URL + CHALLENGES_URL} className={style.text}>Chamber</NavLink>
                        <NavLink to={ROOT_URL + FAVOURITES_URL} className={style.text}>Избранное</NavLink>
                    </div>
                    <div className={style.rightNavBox}>
                        <a className={style.navLink}>
                            <img src={NotificationsIcon} alt={'Notifications'}/>
                        </a>
                        <NavLink to={ROOT_URL + SETTINGS_URL} className={style.navLink}>
                            <img src={SettingsIcon} alt={'Settings'}/>
                        </NavLink>
                        <NavLink to={ROOT_URL + PROFILE_PAGE.URL + PROFILE_PAGE.CHALLENGES.URL} onClick={handleProfileSelfClick} className={style.navLink}>
                            <img src={ProfileIcon} alt={'Profile'}/>
                        </NavLink>
                    </div>
                    {/*<NavLink to={ROOT_URL + LOGIN_URL}>*/}
                    {/*    Logout*/}
                    {/*</NavLink>*/}
                </header>
            </div>
            <div className={style.outlet}>
                <Outlet/>
            </div>
            <footer className={style.footer}>
                {/*<span>@WebChamber, 2023</span>*/}
            </footer>
        </div>
    );
};

export default MainHeader;
