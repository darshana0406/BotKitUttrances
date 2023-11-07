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
let anythingelse = false;

module.exports = {
    botId: 'st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e', 
    botName: 'GenralBot',

    on_user_message: function (requestId, data, callback) {
        if (anythingelse) {
            const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
    
            function fetchDataFromMockApi(callback) {
                // Simulate making an API request to the mock endpoint
                fetch(mockApiEndpoint)
                    .then(response => response.json())
                    .then(tableData => {
                        const userInput = data.context.session.BotUserSession.lastMessage.messagePayload.message.body;
    
                        const found = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "Yes" && anythingelse);
                        const notfound = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "No" && anythingelse);
    
                        if (found) {
                            console.log(`Yes, Your input "${userInput}" is Eligible`);
                            data.message = 'Yes, Your Utterance is Eligible';
                            data.triggerDialog = 'paybill';                            
                            return sdk.sendUserMessage(data, callback);
                        } else if (notfound) {
                            console.log(`No, Your input "${userInput}" is not Eligible`);
                            data.message = 'No, Your Utterance is Not Eligible';
                            return sdk.sendUserMessage(data, callback);
                        } else {
                            console.log(`No, Your input "${userInput}" is not Eligible`);
                            data.message = 'No, Your Utterance is Not Eligible';
                            return sdk.sendUserMessage(data, callback);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data from the mock API:', error);
                        callback([]);
                    });
            }
    
            fetchDataFromMockApi(function (tableData) {
                callback();
            });
        } else {
            return sdk.sendBotMessage(data, callback);
        }
        // sdk.sendBotMessage(data, callback);
    },
    on_bot_message: function (requestId, data, callback) {
        console.log(data.context.intentName);
        if (data.context.intentName === "AnythingElse") {
            anythingelse = true;
        } else {
            anythingelse = false; // Reset the flag if the intent is not "AnythingElse"
        }
        return sdk.sendUserMessage(data, callback);
    }
    
    

};

