import React, {useEffect, useState} from 'react';
import style from './CreatePost.module.scss'
import FileUploader from "../../components/FileUploader/FileUploader";
// import LinkUploader from "../../components/LinkUploader/LinkUploader";
// import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import {useDispatch, useSelector} from "react-redux";
import post_create from "../../../actions/post/post_create";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
    const [file, setFile] = useState();
    // const [externalLink, setExternalLink] = useState();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const [request, setRequest] = useState(false)
    const postInfo = useSelector(state => state.post)
    const challengeInfo = useSelector(state => state.challenge)
    // Надо вызывать список челленджей через редакс и смотреть в него

    const isChallengeRelated = postInfo.challenge_id
    const challengeName = challengeInfo.name[0] === '#' ? challengeInfo.name : '#' + challengeInfo.name

    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleInputTextChange = (e) => {
        setName(e.target.value)
    }

    const handleTextareaChange = (e) => {
        setDescription(e.target.value)
    }


    useEffect(() => {
        console.log('request value: ', request)
        if(request) {
            console.log('challenge_id: ', challengeInfo.challenge_id)
            const args = {
                tags_list: [
                    name
                ],
                description: description,
                file: file ? file : '',
                challenge_id: challengeInfo.challenge_id,
                external_data_link: false
            }
            post_create(dispatch, args)
                .then(() => {
                    navigate('/challenge')
                })
        }
    }, [request])



    // const handleUploadClick = (e) => {
    //     e.preventDefault()
    //     if (!file && !externalLink) {
    //         return;
    //     }
    //     console.log('!file? request value: ', request)
    //     //setRequest(true)
    //     //request = true
    //     console.log('request value0: ', request)
    //     // const args = {
    //     //     tags_list: [
    //     //         name
    //     //     ],
    //     //     description: description,
    //     //     file: file ? file : '',
    //     //     challenge_id: challengeInfo.challenge_id,
    //     //     authors: [
    //     //         '85292376'
    //     //     ]
    //     // }
    //     // post_create(dispatch, args)
    // }

    return (
        <div className={style.pageContainer}>
            <div className={style.mainContainer}>
                <span className={style.pageText}>Добавить работу</span>
                <div className={style.rowContainer}>
                    <div className={style.columnContainer}>
                        <FileUploader file={file} handler={handleFileChange}/>
                        {/*<span className={style.pageText}>или</span>*/}
                        {/*<LinkUploader />*/}
                    </div>
                    <div className={style.columnContainer}>
                        {
                            isChallengeRelated && <span className={style.challengeTitle}>{challengeName}</span>
                        }
                        <input className={style.postTitle} onChange={handleInputTextChange} placeholder={'Название'}/>
                        <textarea className={style.postDescription} onChange={handleTextareaChange} placeholder={'Описание'}/>
                        <button className={style.buttonPrimaryBody} onClick={() => setRequest(true)}>
                            <span className={style.buttonText}>Загрузить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;