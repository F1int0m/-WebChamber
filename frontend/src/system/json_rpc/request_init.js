function request_init(args) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'webchamber_token': args.token
        },
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': args.method,
            'params': args.params,
            'id': 1
        })
    }
}

export default request_init;