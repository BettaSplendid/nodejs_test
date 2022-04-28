const express = require('express');
const fs = require("fs")
const { json } = require('express/lib/response');
const bodyParser = require("body-parser");

const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3200;
var json_file = require('./inventory.json');
var use_json_file = JSON.stringify(json_file);

// This does not work, the cors library handle it for me. this is for future ref.
// app.use(function(req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:');

//     //     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     //     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// });

app.get('/', (req, res) => {
    res.json(json_file);

})

app.get('/articles/:productID', (req, res) => {
    // res.send("Article " + req.params.productID);

    var id_to_get = req.params.productID;
    var data_sent = json_file.articles[id_to_get - 1];
    data_sent = JSON.stringify(data_sent);
    res.send('GET request to the homepage, Here is the article : ' + data_sent)
})

app.post('/add', (req, res) => {
    console.log("Add");
    console.log(req.body.id);
})

app.post('/modify', (req, res) => {
    console.log("Modify Article")
    console.log(req.body)
    res.send("Hello")
    let found_thing = {};
    for (let index = 0; index < json_file.articles.length; index++) {
        const element = json_file.articles[index];
        if (element.id == req.body.id) {
            console.log(element);
            element.id = req.body.id;
            element.title = req.body.title;
            element.description = req.body.description;
            element.price = req.body.price;
            element.currency = req.body.currency;
            element.brand = req.body.brand;
            console.log(element);
            break;
        }

    }

    fs.writeFileSync("./inventory.json", JSON.stringify(json_file))
})

app.delete('/delete/:productID', (req, res) => {
    console.log("delete")
    console.log(req.params.productID);
    var id_to_get = req.params.productID;
    id_to_get = id_to_get.replace(":", "");
    id_to_get = parseInt(id_to_get);
    console.log({ id_to_get });
    // console.log(json_file)
    for (let index = 0; index < json_file.articles.length; index++) {
        const element = json_file.articles[index];
        console.log(element)
        if (element.id == id_to_get) {
            json_file.articles.splice(index, 1);
            console.log("Found something to delete")
            break;
        }
    }
    console.log(json_file);
})

app.listen(port, () => {
    console.log("Hello World, server is working, port " + port);
    // console.log(json_file);
});