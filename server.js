const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { Wit, log } = require('node-wit');
const { interactive } = require('node-wit');
var mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('scripts'));
// app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConnection = mongoose.connect('mongodb://localhost/chatbot-axa');

var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function() {
  console.log('MongoDB is connected to Node');
});

var Schema = mongoose.Schema;
var todolistSchema = new Schema(
  { slno: { type: Number }, todo: { type: String } },
  { collection: 'todolist' }
);

var todoModel = mongoose.model('todolist', todolistSchema);

const client = new Wit({
  accessToken: 'PIH7VF3VCM4X4RTYNS2K4ZPRAWKZ6R5E'
});

// CRUD on todolist collection - starts
app.get('/todolist', function(req, res) {
  todoModel.find({}, function(err, obj) {
    if (err) {
      console.log(err);
    } else {
      var todolist = [];
      for (var i = 0; i < obj.length; i++) {
        todolist.push(obj[i]);
      }
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      //to avoid CORS error
      res.send(JSON.stringify(todolist));
    }
  });
});

app.post('/todolist/add', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  todoModel.create([{ slno: req.body.slno, todo: req.body.todo }], function(
    err,
    arr
  ) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(arr[0]));
    }
  });
});

app.post('/todolist/del', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  todoModel.remove({ slno: req.body.slno, todo: req.body.todo }, function(
    err,
    arr
  ) {
    if (err) {
      console.log(err);
    } else {
    }
  });
});
// CRUD on todolist collection - ends

app.post('/msgsent', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('/msgsent is working', req.body);

  client
    .message(req.body.text, {})
    .then(data => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
      res.send(data);
    })
    .catch('mg err', console.error);
});

app.listen(5000);
console.log('yup listerning to 5000');
