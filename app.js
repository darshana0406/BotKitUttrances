var Application = require("./lib/app");
var Server      = require("./lib/server");
var sdk         = require("./lib/sdk");
var config      = require("./config");
const express = require("express");

var app1 = express();

// app1.use(bodyParser.json());
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));
// app1.use(cors());

app1.get("/test", function(req, res){
    console.log("req");
    res.json({msg:true});
})


var app    = new Application(null, config);
var server = new Server(config, app);

sdk.checkNodeVersion();

server.start();

// sdk.registerBot(require('./FindAFlight.js'));
// sdk.registerBot(require('./SimpleConversationalBot.js'));
// sdk.registerBot(require('./SimpleConversationalBotWithMultipleBotId.js'));
// sdk.registerBot(require('./GuessTheNumber.js'));
// sdk.registerBot(require('./BookACab.js'));
// sdk.registerBot(require('./OrderAPizza.js'));
// sdk.registerBot(require('./BotVariables.js'));
// sdk.registerBot(require('./LiveChat.js'));
//sdk.registerBot(require('./Node-New09.js'));
//sdk.registerBot(require('./Node-New09.js'));
sdk.registerBot(require('./Nov10th.js'));
