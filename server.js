var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();


// ***************************** SCHEMA *****************************
mongoose.connect('mongodb://localhost/faveauthors');
var AuthorSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name is required"]},
}, {timestamps: true});

mongoose.model('Author', AuthorSchema);// We are setting this Schema in our Models as 'Task'
var Author = mongoose.model('Author'); // We are retrieving this Schema from our Models, named 'Task'
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));



//GET
app.get('/authors', function (req, res) {
    Author.find({}, function (err, author) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ author })
        }
    })
});


//POST
app.post('/new', function (req, res) {
    var newauthor = new Author(req.body);
    newauthor.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            console.log("inside server");
            res.json({ message: "Success"})
        }
    })
});

app.delete('/authors/:id', function (req, res) {
    Author.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.end()
        }
    });
});

app.put('/edit', function (req,res) {
    console.log("REACHED UPDATE ROUTE")
    console.log(req.body);
    Author.findOne({ _id: req.body._id }, function (err, author) {
        if (err) {
            console.log("req.params", req.params._id);

            res.json({ message: "Error", error: err })
        } else {
            author.name = req.body.name;
            author.save(function(err) {
                if (err) {
                    res.json({ message: "Error", error: err })
                } else {
                    res.json({ message: "Success"})
                }
            })
        }
    })
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(1337, function () {
    console.log("listening on port 1337");
});
