const fs = require(`fs`)
const port = 8078;
const express = require(`express`);
const app = express();
const path = require(`path`);
const db = path.join(__dirname, "./db/db.json");

app.get("/api/notes", function(req, res) {
    res.sendFile(db);
  });

app.post("/api/notes", function (req, res){
    note = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    if (!note.title || !note.text) {
        return res
        .status(400)
        .json({ msg: "You need to add some note information" });
    }
    fs.readFile(db, (err, data) => {
        if (err) {
            throw err
        };
        let file = JSON.parse(data);
        file.push(note);
        fs.writeFile(db, JSON.stringify(file, null, 2), err => {
            if (err) throw err;
        });
    });
    res.sendFile(db);
});

app.post("/api/notes", function(req, res) {
    note = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
});

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile(db, (err, data) => {
        if (err) {
            throw err
        };
        let file = JSON.parse(data);
        const newFile = file.filter(obj => obj.id != req.params.id);
        fs.writeFile(db, JSON.stringify(newFile, null, 2), err => {
            if (err) throw err;
        });
    });
    res.sendFile(db);
  });

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(
"/assets/css",
express.static(path.join(__dirname, "./public/assets/css"))
);
app.use(
"/assets/js",
express.static(path.join(__dirname, "./public/assets/js"))
); 
app.use(express.static(path.join(__dirname, "./public")));
app.listen(port, function(){
    console.log(`App listening on PORT ${port}`)
})