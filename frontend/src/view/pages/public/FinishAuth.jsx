import * as React from "react";
import {useSearchParams} from "react-router-dom";

function FinishAuth() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = React.useState([]);

    let token = searchParams.get("webchamber_token")
    console.log(token)
    React.useEffect(() => {
        localStorage.setItem('webchamber_token', token);
    }, [items]);
    window.location.href = '/'


}

export default FinishAuth;