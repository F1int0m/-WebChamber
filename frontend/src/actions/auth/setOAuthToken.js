import {AUTH_URL} from "../../system/env";

export async function SetOAuthToken() {
    console.log('Go to authReducer on url=' + AUTH_URL)

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
}