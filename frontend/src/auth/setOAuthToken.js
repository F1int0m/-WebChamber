import {AUTH_URL} from "../system/env";

export async function SetOAuthToken() {
    // Вызывает на беке установку токена в куки
    /*
    Шаблон для обычных post-fetch методов
    headers: {
            'Content-Type': 'application/json'
        }
    body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': 'ping',
            'params': [],
            'id': 0
        }
    */

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