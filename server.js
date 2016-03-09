var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var _statuses = [];
var MESSAGE_LIMIT = 100;
app.use(express.static('app'));

app.get('/statuses', function(req, res) {
  res.json(_statuses);
});
app.post('/statuses', function(req, res) {
  var IpAddress = req.connection.remoteAddress;
  var newStatus = {
    id: _statuses.length,
    ip: IpAddress,
    user: _.toString(_.get(req.body, "user")).trim(),
    message: _parseMessage(_.get(req.body, "message")),
    date: new Date(),
    sendDate: new Date(_.get(req.body, "date")),
  }

  if (_validateStatus(newStatus)) {
    console.log('Adding new status:');
    console.log('IP USED: ');
    console.log(IpAddress);
    console.log('----------------');
    console.log(newStatus);
    _statuses.push(newStatus);
    res.status(201).json(newStatus);
    console.log('----------------');
  }
  else {
    res.status(404).json('Invalid message reached max MESSAGE_LIMIT');
  }


  function _parseMessage(message){
    var newMessage = _.toString(message);
    var TRUNC = "\u2026";

    if(message.length > MESSAGE_LIMIT) {
      return newMessage.substr(0, MESSAGE_LIMIT - TRUNC.length) + TRUNC;
    }else {
      return newMessage;
    }
  };
  function _validateStatus(status){
    var isValid = true;

    isValid = isValid && !_.isEmpty(status.user);

    isValid = isValid && !_.isEmpty(status.message);

    isValid = isValid && !_.isNaN(status.sendDate.getTime());

    return isValid;
  }
});
app.listen(8080, function(){
  console.log("Server started listening on port 8080");
});
