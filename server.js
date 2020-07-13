require('rootpath')();
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb+srv://ekelsey:Gogators123@cluster0-rglxo.mongodb.net/Test?retryWrites=true&w=majority", function(err, responses){
    if(err) {
        console.log(err);
    }
    else{
        //console.log('Connected to ' + db, ' + ', responses);
     
    }
});

const app = express();
app.use(bodyParser());
app.use(bodyParser.json({linit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

 app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,origin,authorization,accept,client-security-token');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});

const Schema = mongoose.Schema;

const JournalSchema = Schema({
    username: {type: String},
    title: {type: String},
    day: {type: String},
    month: {type: String},
    year: {type: String},
    text: {type: String}

},{versionKey: false});

const UsersSchema = Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String},
    zoom: {type: String},
    password: {type: String},
    email: {type: String},
    friends: {type: Array}

},{versionKey: false});

var model = mongoose.model('Users', UsersSchema, 'Users');
var JournalModel = mongoose.model('Journals', JournalSchema, 'Journals');

    app.post("/api/deleteUser", function(req,res){
        model.remove({ _id: req.body.id }, function(err) {
            if(err) {
                res.send(err);
            }
            else{
                res.send({data:"Record has been deleted"});
            }
        });
    })

    app.post("/api/login", function(req,res){
        model.find({username: req.body.username}, function(err, data) {
            if(err) {
                res.send(err);
            }
            else{
                res.send(data);
                
            }
        });
    })

    app.post("/api/register", function(req,res){
        var mod = new model(req.body);
        mod.save(function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                //console.log(data);
                res.send(data);
            }
        });
    })

    app.get("/api/getUser", function(req,res){
        model.find({}, function(err, data) {
            if(err) {
                res.send(err);
            }
            else{
                res.send(data);
            }
        });
    })

    app.get('/api/getAllUsers', function(req,res){
        console.log('found endpoint')
        model.find({}, function(err, data) {
            if(err) {
                res.send(err);
                console.log('a');
            }
            else{
                res.send(data);
                console.log('b');
            }
        });
    })    


    app.get('/api/getAllJournals', function(req,res){
        console.log('found endpoint')
        JournalModel.find({}, function(err, data) {
            if(err) {
                res.send(err);
                console.log('a');
            }
            else{
                res.send(data);
                console.log('b');
            }
        });
    })    

    
    app.put('/api/addAFriend', function(req,res){
        //console.log('hit')
        model.findByIdAndUpdate(req.body._id, {$push: {friends: req.body.friendToAdd}}, {new: true},
            function(err,data) {
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send({data:"Record has been updated"});
                }
            });

    })    

    app.delete('/api/deleteUser', function(req, res){
        console.log('trying to delete');
        res.json(req.body);
    })

    app.post("/api/saveJournalEntry", function(req,res){
        var journal = new JournalModel(req.body);
        console.log(req.body.text);
        journal.save(function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                //console.log(data);
                res.send(data);
            }
        });
    })

    // app.listen(8080, function () {
    //     console.log('Correct port found')
    // })

    app.listen(8080, () => console.log(`Example app listening at http://localhost:8080`))
