export async function FetchOAuth() {
    // Вызывает на беке метод установки токена в куки
    const response = await fetch('http://212.220.113.111/auth/vk/login-start', {
        method: 'POST',
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