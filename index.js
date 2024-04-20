const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser')
const config = require("./config.js")
const app = express()

const upload = multer();

app.use(upload.none());
app.use(bodyParser.json());

app.post('/message', upload.none(), bodyParser.json(), async (req, res, next) => {
    var token = req.query.token || req.headers["x-gotify-key"] || req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : ""
    const priority = ["min", "low", "default", "high", "max"]
    if (!config.topics[token.split("/")[0]] || config.topics[token.split("/")[0]].secret != token.split("/")[1]) return res.json({
        "error": "Unauthorized",
        "errorCode": 401,
        "errorDescription": "Please provide a ?token in the format of topic/api_token"
    }).status(401)
    console.log(req.body)

    if (!req.body.message) return res.json({
        "error": "Bad Request",
        "errorCode": 400,
        "errorDescription": "Please provide a message."
    }).status(400)

    const msg = await (await fetch(config.ntfy.base + token.split("/")[0], {
        method: 'POST',
        body: req.body.message,
        headers: {
            'Title': req.body.title,
            'Priority': priority[req.body.priority - 1 || 3] || "default",
        }
    })).json()

    res.json({
        id: msg.id,
        appid: 1,
        message: req.body.message,
        title: req.body.title,
        priority: req.body.priority,
        date: new Date().toISOString()
    });

})
app.listen(config.server.port || process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${config.server.port || process.env.PORT || 3000}`)
})