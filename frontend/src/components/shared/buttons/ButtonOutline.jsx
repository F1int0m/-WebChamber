import React from 'react';
import style from '../../core/buttons/Button/Button.module.scss'
import icons from '../../core/Icon/Icons'
import Button from "../../core/buttons/Button/Button";
import Icon from "../../core/Icon/Icon";
import likes from "../../../static/icons/likes.svg";

const ButtonOutline = ({content}) => {

    const like_icon = icons.like_icon


    return (
        <>
            <Button
                content={content}
                icon={like_icon}
                style_type={style.outline}
            />
        </>
    );
};

export default ButtonOutline;