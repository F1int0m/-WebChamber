import React from 'react';
import previewStyle from "./profilePreview.module.scss";
import fullStyle from "./profileFull.module.scss";
import AdditionalBox from "./AdditionalBox";
import ButtonsArea from "./ButtonsArea";
import OutletInfo from "./OutletInfo";

const InfoBox = ({isFull, userInfo}) => {
    const style = isFull ? fullStyle : previewStyle;

    const info_fake = {
        title: '#challengename',
        description: 'Post description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in risus lobortis, lobortis mi ac, convallis enim. Etiam sed pharetra risus, ut pharetra ex. Vestibulum commodo consectetur augue nec tempus. Aliquam ut ipsum egestas, tincidunt turpis eget, faucibus sem. Donec eget ex molestie, hendrerit nisi nec, finibus ex. Morbi fringilla at libero non varius. Donec efficitur justo nec nulla consequat lobortis. Etiam nec magna laoreet, commodo tellus ac, dictum ipsum. Etiam risus metus, placerat vel tempus posuere, dapibus a nulla. Nulla dignissim ipsum ac pellentesque fermentum.'
    }
    const nickname = userInfo.nickname || 'Unknown user'
    return (
        <div className={style.infoBox}>
            <div className={style.row1}>
                <span className={style.nickname}>
                    {nickname}
                </span>
                <ButtonsArea />
            </div>
            {
                isFull ? <AdditionalBox info={userInfo}/> : <OutletInfo info={info_fake}/>
            }
        </div>
    );
};

export default InfoBox;