import React, {useState} from 'react';
import AvatarImage from "../../../static/images/avatar.jpg";
import styles from './post.module.scss'

const AuthorsList = ({authors}) => {
    const [isOpened, setIsOpened] = useState(false)

    function HandleListClick() {
        setIsOpened(!isOpened)
    }

    return (
        <div onClick={HandleListClick}>
            {
                !isOpened && <span className={styles.authorsListLabel}>Авторы</span>
            }
            {
                isOpened && authors.map(author =>
                    <div key={author.authorId}>
                        <img src={AvatarImage} alt={'avatar'}/>
                        <span>{author.authorNickname}</span>
                    </div>
                )
            }
        </div>
    );
};

export default AuthorsList;