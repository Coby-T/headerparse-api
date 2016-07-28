var express = require("express")
var path = require("path")
var app = express()

const port = 8080

app.get('/', function(req, res) {
    var guidePath = path.join(__dirname, "index.html")
    res.sendFile(guidePath, function (err) {
        if (err) {
            throw err
        }
        else {
            console.log("Guide sent")
        }
    })
})

app.get('/whoami/', function(req, res) {
    const osregex = /(\([A-Za-z0-9;,./\s]*\))/g
    const ipregex = /(\d+.)+/g
    var ip = ipregex.exec(req.ip)[0]
    var os = osregex.exec(req.headers['user-agent'])[0].slice(1,-1)
    var lang = req.headers['accept-language'].split(";")[0]
    res.json({
        IPAddress: ip,
        OperatingSystem: os,
        Language: lang
    })
})

app.listen(process.env.PORT || port)