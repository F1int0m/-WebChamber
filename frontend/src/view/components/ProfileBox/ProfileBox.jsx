import React from 'react';
import styles from './profile.module.scss'
import avatarImage from '../../../static/images/profile.jpg'
import InfoBox from "./InfoBox";
import user_get_self from "../../../api/user/user_get_self";
import ping from "../../../api/auth/ping";
import user_edit from "../../../api/user/user_edit";
import user_get from "../../../api/user/user_get";
import user_notification_list from "../../../api/user/user_notification_list";
import user_notification_update from "../../../api/user/user_notification_update";
import user_search from "../../../api/user/user_search";
import user_set_role from "../../../api/user/user_set_role";
import user_subscribe from "../../../api/user/user_subscribe";
import user_unsubscribe from "../../../api/user/user_unsubscribe";
import user_subscribers_list from "../../../api/user/user_subscribers_list";

const ProfileBox = ({isFull, info}) => {
    // Type: Preview / Full

    const user_id = 1
    const user_role = 'ADMIN'
    const nickname = 'qwerty'
    const mood_text = 'moody'
    const description = 'moody qwerty admin'
    const only_unwatched = true
    const nickname_substring = 'qwer'
    const types_to_update = [
        'SUBSCRIBER'
    ]

    ping()
    // user_edit(nickname, mood_text, description)
    // user_get_self()

    // user_get(user_id)

    // user_notification_list(only_unwatched)
    // user_notification_update(types_to_update)
    // user_search(nickname_substring)
    // user_set_role(user_id, user_role)
    // user_subscribe(user_id)
    // user_unsubscribe(user_id)
    // user_subscribers_list()

    return (
        <div className={styles.profileBox}>
            <div className={styles.avatarBox}>
                <img src={avatarImage} alt={'avatar.jpg'}/>
            </div>
            <InfoBox isFull={isFull} info={info}/>
        </div>
    );
};

export default ProfileBox;