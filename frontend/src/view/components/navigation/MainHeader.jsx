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

import user_get_self from "../../../api/user/user_get_self";
import {store} from "../../../store/store";


const MainHeader = () => {
    async function handleProfileClick() {
        await user_get_self()
            .then(data => {
                store.dispatch({
                    type: 'profile/get_self',
                    payload:
                        {
                            isLoading: false,
                            user_id: data.user_id,
                            role: data.role,
                            nickname: data.nickname,
                            mood_text: data.mood_text,
                            description: data.description,
                            avatar_link: data.avatar_link
                        }
                })
        })
    }

    const location = useLocation();
    const style = location.pathname.toString() === '/post' ? darkMode : lightMode

    return (
        <div>
            <div className={style.box}>
                <header className={style.header}>
                    <div className={style.leftNavBox}>
                        <img src={logo} alt={'logo'} width={80} height={80}/>
                    </div>
                    <div className={style.mainNavBox}>
                        <NavLink to={ROOT_URL + CHAMBER_URL + CHALLENGES_URL} className={style.text}>Chamber</NavLink>
                        <NavLink to={ROOT_URL + FAVOURITES_URL} className={style.text}>Избранное</NavLink>
                    </div>
                    <div className={style.rightNavBox}>
                        <a className={style.navLink}>
                            <img src={NotificationsIcon} alt={'Notifications'}/>
                        </a>
                        <NavLink to={ROOT_URL + SETTINGS_URL}
                                 className={style.navLink}>
                            <img src={SettingsIcon} alt={'Settings'}/>
                        </NavLink>
                        <NavLink to={ROOT_URL + PROFILE_PAGE.URL + PROFILE_PAGE.CHALLENGES.URL}
                                 onClick={handleProfileClick}
                                 className={style.navLink}>
                            <img src={ProfileIcon} alt={'Profile'}/>
                        </NavLink>
                        <NavLink to={ROOT_URL + LOGIN_URL}>Logout</NavLink>
                    </div>
                </header>
            </div>

            <Outlet/>
            <footer>
            </footer>
        </div>
    );
};

export default MainHeader;