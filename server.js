const express = require('express');
const fs = require("fs")
const { json } = require('express/lib/response');

var app = express();
var port = 3200;
var json_file = require('./inventory.json');
var use_json_file = JSON.stringify(json_file);

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:');

    //     // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //     // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
});

app.get('/', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "localhost:");
    // res.json(use_json_file);
    console.log("get all articles")
    res.send('hello')


})

app.get('/articles/:productID', (req, res) => {

    var id_to_get = req.params.productID;
    var data_sent = json_file.articles[id_to_get];
    data_sent = JSON.stringify(data_sent);
    res.send('GET request to the homepage, id : ' + data_sent)
})

app.post('/add', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        brand: req.body.brand,
    }
    json_file.push(newProduct)
})

app.post('/modify', (req, res) => {

    let found_article = {}

})

app.delete('/delete/.id', (req, res) => {
    console.log("delete")
    var id_to_get = req.params.productID;
    var data_delete = json_file.articles[id_to_get];
    console.log(data_delete)
})

app.listen(port, () => {
    console.log("Hello World, server is working, port " + port);
    // console.log(json_file);
});