const request = require('request'); 
var botId = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName = "GenralBot";
var sdk = require("./lib/sdk");
var botVariables = {};
var langArr = require('./config.json').languages;
var _ = require('lodash');
var dataStore = require('./dataStore.js').getInst();
var first = true;
// const app = express();
var anythingelse = false;

module.exports = {
    botId: 'st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e', 
    botName: 'GenralBot',

    on_user_message : function(requestId, data, callback) {        
        // console.log(data.context.result);
        console.log("Here 2");
        sdk.sendBotMessage(data, callback);       
    },
    on_bot_message  : function(requestId, data, callback) {
        console.log("Here 1");
        sdk.sendUserMessage(data, callback);
    },
    on_webhook  : function(requestId, data, componentId, callback) {
        // console.log(data.context.intent);
        // console.log(data.context.NLAnalysis.userInput);
        // console.log(data);
        // const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
        // function fetchDataFromMockApi(callback) {
        //     // Simulate making an API request to the mock endpoint
        //     fetch(mockApiEndpoint)
        //         .then(response => response.json())
        //         .then(data => {
        //             callback(data);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching data from the mock API:', error);
        //             callback([]);
        //         });
        // }
        // fetchDataFromMockApi(function(tableData) {
        //     // Get the user's input from the data
        //     const userInput = data.context.NLAnalysis.userInput;
    
        //     // Check if the userInput exists in the data table
        //     const found = tableData.some(row => row.IntentName === userInput);
    
        //     // Perform actions based on the result of the comparison
        //     if (found) {
        //         // console.log(`User input "${userInput}" exists in the data table.`);
        //         data.context.result = "User input '${userInput}' exists in the data table.";
        //         // var message = {
        //         //     "message" : response,
        //         //     "channel" : data.channel,
        //         //     "context" : data.context

        //         // };
        //         // sdk.sendBotMessage(message, function () {
        //         //     // Continue with the conversation or respond to the user
        //         //     callback();
        //         // });
        //         // Perform some action
        //         // console.log(data);
                
        //     } else {
        //         console.log(`User input "${userInput}" does not exist in the data table.`);
        //         // Perform a different action
        //     }
    
        //     // Continue with the conversation or respond to the user
            
        // });
        
        console.log("here");
        sdk.saveData(requestId, data)
                .then(function() {
                    data.context.result = "ha ha ha";
                callback(null, new sdk.AsyncResponse());
                  });
    }
    

};

