import React from 'react';
import ContentHeader from "../../components/Content/ContentHeader/ContentHeader";
import {Outlet} from "react-router-dom";
import style from '../setupPages.module.scss'

const Chamber = () => {
    return (
        <div className={style.setupChamber}>
            <ContentHeader page={'chamber'}/>
            <Outlet />
        </div>
    );
};

export default Chamber;