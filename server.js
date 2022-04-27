const express = require('express');
const { json } = require('express/lib/response');

var app = express();
var port = 3200;
var json_file = require('./inventory.json');

// app.use(function(req, res, next) {
//     //     // Website you wish to allow to connect
//     //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//     //     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     //     // Request headers you wish to allow
//     //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// });

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "localhost:");
    var to_send = JSON.stringify(json_file);
    res.json(to_send);

})

// app.post('/', (req, res) => {
//     res.json(json_file);
// })

app.listen(port, () => {
    console.log("Hello World, server is working, port " + port);
    // console.log(json_file);
});