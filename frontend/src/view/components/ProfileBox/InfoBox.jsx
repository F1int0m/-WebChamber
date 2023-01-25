import React from 'react';
import previewStyle from "./profilePreview.module.scss";
import fullStyle from "./profileFull.module.scss";
import AdditionalBox from "./AdditionalBox";
import ButtonsArea from "./ButtonsArea";
//import OutletInfo from "./OutletInfo";

const InfoBox = ({viewType, userInfo, callback}) => {
    // viewType: Preview / SelfPreview / Full / SelfFull

    // TODO: реализовать показ описания поста

    const style = viewType === 'Full' || viewType === 'SelfFull' ? fullStyle : previewStyle;
    return (
        <div className={style.infoBox}>
            <div className={style.row1}>
                <span className={style.nickname} onClick={callback}>
                    {userInfo.nickname}
                </span>
                <ButtonsArea viewType={viewType}/>
            </div>
            {
                viewType === 'Full' || viewType === 'SelfFull' &&
                    <AdditionalBox info={userInfo}/>
                // : <OutletInfo info={info_fake}/>
            }
        </div>
    );
};

export default InfoBox;