import React from 'react';
import style from './ButtonCustom.module.scss'

const ButtonCustom = ({styleType, content, icon, callback}) => {
    // Настраиваемая кнопка со стилевыми наборами в getClassBy

    const getClassBy = {
        'primary': style.primary,
        'outline': style.outline,
        'player': style.player
    }
    let styleClasses = getClassBy[styleType] + ' ';
    if (icon && content) {
        styleClasses += style.with_icon
    }
    else if (icon && !content) {
        styleClasses += style.only_icon
    }
    else {
        styleClasses += style.no_icon
    }
    return (
        <button className={styleClasses} onClick={callback}>
            {content}
            {icon}
        </button>
    );
};

export default ButtonCustom;