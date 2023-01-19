import React from 'react';
import style from './Search.module.scss'
import ButtonPrimary from "../buttons/ButtonPrimary";

import SearchIcon from '../../../static/icons/search.svg'
import AddContentIcon from '../../../static/icons/addContent.svg'
import {useNavigate} from "react-router-dom";

const Search = ({addContentButton}) => {
    const navigate = useNavigate()

    function handleAnnContentButtonClick() {
        console.log('open create post page')
        navigate('/post/create')
    }

    return (
        <div className={style.box}>
            <div className={style.search}>
                <span className={style.placeHolder}>Поиск...</span>
                <img src={SearchIcon} className={style.icon} alt={'search'}/>
            </div>
            {addContentButton &&
                <ButtonPrimary text={'Добавить работу'} callback={handleAnnContentButtonClick} isIcon={true} iconLink={AddContentIcon}/>
            }
        </div>
    );
};

export default Search;