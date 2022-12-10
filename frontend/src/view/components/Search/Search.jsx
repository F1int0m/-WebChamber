import React from 'react';

const Search = ({addContentButton}) => {
    return (
        <div>
            <input placeholder={'Поиск...'}/>
            {addContentButton && <button>Добавить работу</button>}
        </div>
    );
};

export default Search;