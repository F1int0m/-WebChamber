import {AUTH_URL} from "../../system/env";
import user_get_self from "../user/user_get_self";

export async function SetOAuthToken() {
    console.log('Go to auth on url=' + AUTH_URL)

    await fetch(AUTH_URL)
        .then(response => {
                response
                    .text()
                    .then((text) => {
                        console.log('Found redirect url=' + text)
                        document.location = text
                    })
            }
        )
    user_get_self()
}