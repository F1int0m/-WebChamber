import {FETCH_AUTH_URL} from "../env";

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
    try {
        await fetch(FETCH_AUTH_URL, {
            method: 'GET',
            mode: 'no-cors',
        }).then()
    } catch (e) {
        // TODO: надо узнать как тут красиво отлавливать 302 ответ с бека и адекватно редиректить пользователя
        console.log(e)
    }
}