const http = require (`http`);
const fs = require(`fs`)
const port = 8078;
const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const server = http.createServer((req, res) => {
    const path = req.url.toLowerCase();

});

app.get( "/api/notes", function (req, res){
    fs.readFile(`./././db/db.json`)
})
app.use(bodyParser.json());
app.listen(port, function(){
    console.log(`App listening on PORT ${port}`)
})