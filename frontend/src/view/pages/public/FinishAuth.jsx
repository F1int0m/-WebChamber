import {useSearchParams} from "react-router-dom";

function FinishAuth() {
    let token_name = "webchamber_token"
    const [searchParams, setSearchParams] = useSearchParams();


    let token = searchParams.get(token_name)
    console.log(token)
    //  todo сохранять токен куда-то


}

export default FinishAuth;