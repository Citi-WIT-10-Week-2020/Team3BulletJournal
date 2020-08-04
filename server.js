require('rootpath')();
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const { time } = require('console');
require('dotenv').config();

var db = mongoose.connect("mongodb+srv://ekelsey:Gogators123@cluster0-rglxo.mongodb.net/Test?retryWrites=true&w=majority", function(err, responses){
    if(err) {
        console.log(err);
    }
    else{
        //console.log('Connected to ' + db, ' + ', responses);
     
    }
});

//try creating another app that runs the server and then call that url instead of localhost


const app = express();
app.use(bodyParser());
app.use(bodyParser.json({linit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', (process.env.PORT || 8080));

 app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,origin,authorization,accept,client-security-token');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});


const Schema = mongoose.Schema;

const MoodSchema = Schema({
    username: {type: String},
    mood: {type: String},
    day: {type: String},
    month: {type: String},
    year: {type: String},
    
},{versionKey: false});

const MeetingSchema = Schema({
    username: {type: String},
    participants: {type: Array},
    day: {type: String},
    month: {type: String},
    year: {type: String},
    startTime: {type: String},
    endTime: {type: String},
    title: {type: String},
    host: {type: String},
},{versionKey: false});

const JournalSchema = Schema({
    username: {type: String},
    title: {type: String},
    prompt: {type: String},
    day: {type: String},
    month: {type: String},
    year: {type: String},
    text: {type: String},
    type: {type: String}

},{versionKey: false});

const UsersSchema = Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String},
    zoomLink: {type: String},
    password: {type: String},
    email: {type: String},
    friends: {type: Array},
    bio: {type: String},
    hobbies: {type:String},
    role: {type:String}, 
    status: {type:String},
    hostBool: {type: Boolean},
    icon: {type: String}

},{versionKey: false});

var model = mongoose.model('Users', UsersSchema, 'Users');
var JournalModel = mongoose.model('Journals', JournalSchema, 'Journals');
var MoodModel = mongoose.model('Moods', MoodSchema, 'Moods');
var MeetingModel = mongoose.model('Meetings', MeetingSchema, 'Meetings');

app.put('/api/removeMood', function(req,res){
    console.log(req.body.id)
    console.log(req.body.mood);
    MoodModel.findByIdAndUpdate({_id: req.body.id}, {$set: {mood: req.body.mood}}, {new: true},
        function(err,data) {
            if(err) {
                //console.log(err);
                res.send(err);
            }
            else{
                console.log(req.body.username);
                res.send(data);
            }
        });
})   

app.put('/api/updateUser', function(req,res){
    console.log(req.body.userData)
    model.findByIdAndUpdate({_id: req.body._id}, {$set: {firstName: req.body.userData.firstName, lastName: req.body.userData.lastName, zoomLink: req.body.userData.zoomLink, role: req.body.userData.role, bio: req.body.userData.bio, hobbies: req.body.userData.hobbies, email: req.body.userData.email}}, {new: true},
        function(err,data) {
            if(err) {
                //console.log(err);
                res.send(err);
            }
            else{
                //console.log(req.body.username);
                //console.log(res)
                res.send(data);
            }
        });
})   

    app.post("/api/login", function(req,res){
        console.log('login reached');
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
        console.log('working in server');
        var mod = new model(req.body);
        mod.save(function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
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

    app.get('/', function(request, response) {
        var result = 'App is running'
        response.send(result);
    }).listen(app.get('port'), function() {
        console.log('App is running, server is listening on port ', app.get('port'));
    });

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
    
    app.get('/api/getAllMeetings', function(req,res){
        console.log('found endpoint')
        MeetingModel.find({}, function(err, data) {
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

    app.get('/api/getAllMoods', function(req,res){
        console.log('found endpoint')
        MoodModel.find({}, function(err, data) {
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
        console.log('hit')
        model.findByIdAndUpdate(req.body._id, {$addToSet: {friends: req.body.friendToAdd}}, {new: true},
            function(err,data) {
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });

    })    

    app.put('/api/removeMood', function(req,res){
        console.log(req.body.id)
        console.log(req.body.mood);
        MoodModel.findByIdAndUpdate({_id: req.body.id}, {$set: {mood: req.body.mood}}, {new: true},
            function(err,data) {
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
    })
    
    app.put('/api/acceptMeeting', function(req,res){
        console.log("req.body: " + req.body);
        console.log("_id:" + req.body._id);
        console.log("index:" + req.body.index);
        index = req.body.index;
        
        if(index == 0){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.0.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 1){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.1.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 2){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.2.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });  
        }
        else if(index == 3){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.3.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 4){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.4.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else{
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.5.status": "Accepted"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
    })

    app.put('/api/updatePromptJournal', function(req,res){
        console.log('hit')
        console.log(req.body._id);
        console.log(req.body.textEntry);
        JournalModel.findByIdAndUpdate({_id: req.body._id}, {$set: {text: req.body.textEntry}}, {new: true},
            function(err,data) {
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(req.body.username);
                    res.send(data);
                }
            });

    })    

    app.delete('/api/deleteJournal', function(req,res){
        //console.log(req.body._id)
        JournalModel.findByIdAndDelete({_id: req.body._id},
            function(err,data){
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(req.body.username);
                    res.send(data);
                }
            }
            );
    })

    app.delete('/api/deleteUser', function(req,res){
        //console.log(req.body._id)
        model.findByIdAndDelete({_id: req.body._id},
            function(err,data){
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(req.body.username);
                    res.send(data);
                }
            }
            );
    })

    app.delete('/api/deleteMeeting', function(req,res){
        //console.log(req.body._id)
        MeetingModel.findByIdAndDelete({_id: req.body._id},
            function(err,data){
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(req.body.username);
                    res.send(data);
                }
            }
            );
    })

    app.put('/api/updateFreeJournal', function(req,res){
        console.log('hit')
        console.log(req.body._id);
        console.log(req.body.textEntry);
        JournalModel.findByIdAndUpdate({_id: req.body._id}, {$set: {text: req.body.textEntry, title: req.body.title}}, {new: true},
            function(err,data) {
                if(err) {
                    //console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(req.body.username);
                    res.send(data);
                }
            });

    })    

    // app.delete('/api/deleteUser', function(req, res){
    //     console.log('trying to delete');
    //     res.json(req.body);
    // })

    app.delete('/api/getAllMoods', function(req, res){
        console.log('id:' + req.body.id);
        MoodModel.findByIdAndDelete(req.body.id, function(err, data) {
            if(err) {
                res.send(err);
                console.log('a');
            }
            else{
                console.log('bahh');
                res.send(data);
            }
        });
    })

    app.put('/api/declineMeeting', function(req,res){
        console.log("req.body: " + req.body);
        console.log("_id:" + req.body._id);
        console.log("index:" + req.body.index);
        index = req.body.index;
        
        if(index == 0){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.0.status": "Declined"}}, {new: true},

            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 1){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.1.status": "Declined"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 2){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.2.status": "Declined"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });  
        }
        else if(index == 3){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.3.status": "Declined"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else if(index == 4){
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.4.status": "Declined"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
        else{
            MeetingModel.findByIdAndUpdate({_id: req.body._id}, {$set: {"participants.5.status": "Declined"}}, {new: true},
            function(err,data) {
                if(err) {
                    res.send(err);
                }
                else{
                    console.log(req.body.username);
                    res.send(data);
                }
            });
        }
    })

    app.post('/api/saveJournalEntry', function(req,res){
        var journal = new JournalModel(req.body);
        journal.save(function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                res.send(data);
            }
        });
    })

    app.post("/api/saveMood", function(req,res){
        var mood = new MoodModel(req.body);
        console.log(req.body.text);
        mood.save(function(err,data){
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

    app.post("/api/createMeeting", function(req,res){
        var meeting = new MeetingModel(req.body);
        meeting.save(function(err,data){
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

    app.post("/api/createRandomMeeting", function(req,res){
        var meeting = new MeetingModel(req.body);
        console.log("reached random meeting");
        meeting.save(function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                res.send(data);
            }
        });
    })
    // app.listen(8080, function () {
    //     console.log('Correct port found')
    // })

    //app.listen(process.env.PORT || 8080, () => console.log(`Example app listening at http://localhost:8080`))
