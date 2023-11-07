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

    // on_user_message : function(requestId, data, callback) {        
    //     sdk.sendBotMessage(data, callback);       
    // },
    // on_bot_message  : function(requestId, data, callback) {
    //      console.log(data.context.intentName);
    //     return sdk.sendUserMessage(data, callback);
    // },
    on_webhook  : function(requestId, payload, componentId, callback) {
        console.log(payload.context.intent);
        console.log(payload.context.NLAnalysis.userInput);
        const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
        function fetchDataFromMockApi(callback) {
            // Simulate making an API request to the mock endpoint
            fetch(mockApiEndpoint)
                .then(response => response.json())
                .then(data => {
                    callback(data);
                })
                .catch(error => {
                    console.error('Error fetching data from the mock API:', error);
                    callback([]);
                });
        }
        fetchDataFromMockApi(function(tableData) {
            // Get the user's input from the payload
            const userInput = payload.context.NLAnalysis.userInput;
    
            // Check if the userInput exists in the data table
            const found = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "Yes");
    
            // Perform actions based on the result of the comparison
            if (found) {
                 console.log(`Yes, Your input "${userInput}" is Eligibile`);
                 anythingelse = true; 
                const response = `User input "${userInput}" exists in the data table.`;
                sdk.sendBotMessage(response, function () {
                    // Continue with the conversation or respond to the user
                    callback();
                });
                sdk.getSavedData(requestId)
                .then(function(payload) {
                    payload.context.successful = false;
                    sdk.respondToHook(payload);
                });
            } else {
                console.log(`No, Your input "${userInput}" is not Eligibile`);
                // Perform a different action
            }
    
            // Continue with the conversation or respond to the user
            callback();
        });
    }
    

};

