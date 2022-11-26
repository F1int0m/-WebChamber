import {FETCH_AUTH_URL} from "../env";

export async function FetchOAuth() {
    // Вызывает на беке метод установки токена в куки
    const response = await fetch(FETCH_AUTH_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': 'ping',
            'params': [],
            'id': 0
        })
    }).then()
    return await response.json();
}