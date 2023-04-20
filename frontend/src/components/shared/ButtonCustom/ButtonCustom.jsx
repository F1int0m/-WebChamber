import React from 'react';
import style from './ButtonCustom.module.scss'

const ButtonCustom = ({styleType, content, icon, callback}) => {
    // Настраиваемая кнопка со стилевыми наборами в getClassBy

    const getClassBy = {
        'primary': style.primary,
        'outline': style.outline
    }
    const styleClasses = getClassBy[styleType] + ' ' + (icon ? style.with_icon : style.no_icon);
    return (
        <button className={styleClasses} onClick={callback}>
            {content}
            {icon}
        </button>
    );
};

export default ButtonCustom;