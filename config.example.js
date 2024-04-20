module.exports = {
    topics: {
        testing: {
            secret: "token" // Your auth token will be "testing/secret". It will publish to the testing topic. Make secret something random and unguessable
        }
    },
    ntfy: {
        base: 'http://localhost:8081/' // Where is it being hosted at?
    },
    server: {
        port: 3000
    }
}