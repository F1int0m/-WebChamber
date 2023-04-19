import React from 'react';
import style from '../../../core/buttons/Button/Button.module.scss'
import Button from "../../../core/buttons/Button/Button";
import Icon from "../../../core/Icon/Icon";
import likes from "../../../../static/icons/likes.svg";

const ButtonPrimary = ({content}) => {

    const like_icon = <Icon
        source={likes}
        fill_color={'None'}
        stroke_color={'#000'}
    />

    return (
        <>
            <Button
                content={content}
                icon={like_icon}
                style_type={style.primary}
            />
        </>
    );
};

export default ButtonPrimary;