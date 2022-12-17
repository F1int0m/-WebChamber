import React from 'react';
import style from './style.module.scss'
import ButtonPrimary from "../buttons/ButtonPrimary";

import SearchIcon from '../../../static/icons/search.svg'
import AddContentIcon from '../../../static/icons/addContent.svg'

const Search = ({addContentButton}) => {
    return (
        <div className={style.box}>
            <div className={style.search}>
                <span className={style.placeHolder}>Поиск...</span>
                <img src={SearchIcon} className={style.icon} alt={'search'}/>
            </div>
            {addContentButton &&
                <ButtonPrimary text={'Добавить работу'} callback={'callback'} isIcon={true} iconLink={AddContentIcon}/>
            }
        </div>
    );
};

export default Search;