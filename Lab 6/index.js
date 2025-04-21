const express = require('express'); // load express module
const nedb = require("nedb-promises"); // load nedb module

const app = express(); // init app
const db = nedb.create('myfile.jsonl'); // init db

app.use(express.json());
app.use(express.static('public')); // enable static routing


app.post('/data', (req, res) => {
    db.insert(req.body)
    .then(doc => res.send({_id: doc._id}))
    .catch(error => res.status(500).send('Could not insert document: ' + error));
});


app.get('/data', (req, res) => {
    db.find({})
    .then(docs => res.send(docs))
    .catch(error => res.status(500).send("No documents found: " + error));
});


app.get('/data/:id', (req, res) => {
    db.findOne({ _id: req.params.id })
    .then(doc => res.send(doc))
    .catch(error => res.status(500).send("Could not find document: " + error));
});


app.patch('/data/:id', (req, res) => {
    db.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(res.send({ message: "Document updated successfully.", updatedData: req.body }))
    .catch(error => res.status(500).send("Could not update document: " + error));
});


app.delete('/data/:id', (req, res) => {
    db.deleteOne({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(error => res.status(500).send("Could not delete document: " + error));
});


app.all('*', (req, res) => { 
    res.status(404).send('Invalid URL.'); 
});


app.listen(3000, () => console.log('Server started at http://localhost:3000'));
