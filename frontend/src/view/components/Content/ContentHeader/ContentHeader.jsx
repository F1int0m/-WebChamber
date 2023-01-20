import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./style.module.scss"

const ContentHeader = ({page}) => {
    return (
        // TODO: поставить тут outlet и заменить все "обёрточные" компоненты (Chamber, Profile, Favourites)
        //       в роутах на ContentHeader
        <div>
            {
                page === 'chamber' &&
                    <header className={style.box}>
                        <NavLink to={'/chamber/challenges'} className={style.nav}>Челленджи</NavLink>
                        <NavLink to={'/chamber/casual'} className={style.nav}>Все работы</NavLink>
                        <NavLink to={'/chamber/people'} className={style.nav}>Люди</NavLink>
                    </header>
            }
            {
                page === 'profile' &&
                    <header className={style.box}>
                        <NavLink to={'/profile/challenges'} className={style.nav}>Челленджи</NavLink>
                        <NavLink to={'/profile/casual'} className={style.nav}>Все работы</NavLink>
                    </header>
            }
            {
                page === 'favourites' &&
                    <header className={style.box}>
                        <NavLink to={'/favourites/challenges'} className={style.nav}>Челленджи</NavLink>
                        <NavLink to={'/favourites/casual'} className={style.nav}>Все работы</NavLink>
                    </header>
            }
        </div>
    );
};

export default ContentHeader;