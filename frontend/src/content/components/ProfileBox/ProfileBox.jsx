import React from 'react';

const ProfileBox = ({isFull, info}) => {
    // Type: Preview / Full
    return (
        <div className={'profile-box'}>
            <h3>{info.avatar}</h3>
            <h3>{info.nickname}</h3>
            {isFull && <div>
                <p>{info.statistics.subs}</p>
                <p>{info.statistics.likes}</p>
                <p>{info.statistics.saves}</p>
                <p>{info.description}</p>
            </div>}
            <button>Включить уведомления</button>
            <button>Подписаться</button>
        </div>
    );
};

export default ProfileBox;