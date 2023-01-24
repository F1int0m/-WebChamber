import React, {useState} from 'react';
import style from './CreatePost.module.scss'
import FileUploader from "../../components/FileUploader/FileUploader";
import LinkUploader from "../../components/LinkUploader/LinkUploader";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import {useDispatch, useSelector} from "react-redux";
import post_create from "../../../actions/post/post_create";

const CreatePost = () => {
    const [file, setFile] = useState();
    const postInfo = useSelector(state => state.post)
    const challengeInfo = useSelector(state => state.challenge)
    const isChallengeRelated = postInfo.challenge_id
    const challengeName = challengeInfo.name[0] === '#' ? challengeInfo.name : '#' + challengeInfo.name

    const dispatch = useDispatch()


    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }
        const args = {}
        post_create(dispatch, args).then()
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log('(fetched): ',data))
            .catch((err) => console.error(err));
    };

    return (
        <div className={style.pageContainer}>
            <div className={style.mainContainer}>
                <span className={style.pageText}>Добавить работу</span>
                <div className={style.rowContainer}>
                    <FileUploader file={file} handler={handleFileChange}/>
                    <span className={style.pageText}>или</span>
                    <LinkUploader />
                </div>
                <form className={style.columnContainer}>
                    {
                        isChallengeRelated &&
                        <span className={style.challengeTitle}>{challengeName}</span>
                    }
                    <input className={style.postTitle} placeholder={'Название'}/>
                    <textarea className={style.postDescription} placeholder={'Описание'}/>
                    <ButtonPrimary text={'Загрузить'} callback={handleUploadClick}/>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;