import React, {useState} from 'react';
// import {useDispatch} from "react-redux";

import ButtonCustom from "../../shared/ButtonCustom/ButtonCustom";

const Subscription = () => {
    const [isClicked, seIsClicked] = useState(false);
    // const dispatch = useDispatch();

    function HandleClick() {
        seIsClicked(!isClicked)
    }

    return (
        <>
            {isClicked ?
                    <ButtonCustom
                        styleType={'outline'}
                        content={'Вы подписаны'}
                        callback={HandleClick}/>
                    :
                    <ButtonCustom
                        styleType={'primary'}
                        content={'Подписаться'}
                        callback={HandleClick}/>
            }
        </>
    );
};

export default Subscription;