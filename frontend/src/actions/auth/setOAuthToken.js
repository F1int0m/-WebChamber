import {AUTH_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

export async function SetOAuthToken() {
    console.log('Go to auth on url=' + AUTH_URL)

    await fetch(AUTH_URL)
        .then(response => {
                response.text()
                    .then((text) => {
                        console.log('Found redirect url=' + text)
                        document.location = text
                    })
            }
        )
}