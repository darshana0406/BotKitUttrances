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

    // function onOrderConfirmationSuccess(requestId, resBody, sdk) {
    //     sdk.getSavedData(requestId)
    //         .then(function(data) {
    //             data.context.orderReferenceId = resBody.orderReferenceId;
    //             data.context.successful = true;
    
    //             sdk.respondToHook(data);
    //         });
    // }
    
    on_webhook: function(requestId, payload, componentId, callback, sdk) {
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
        
        fetchDataFromMockApi(function (tableData) {
            // Get the user's input from the payload
            const userInput = payload.context.NLAnalysis.userInput;
    
            // Check if the userInput exists in the data table
            const found = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "Yes");
            
            // Prepare a response message
            let responseMessage;
    
            if (found) {
                responseMessage = `Yes, Your input "${userInput}" is Eligible`;
            } else {
                responseMessage = `No, Your input "${userInput}" is not Eligible`;
            }
    
            // Construct a response object
            const responsePayload = {
                messages: [
                    {
                        role: 'system',
                        content: responseMessage,
                    }
                ]
            };
            console.log(responsePayload)
            var sdk = require("./lib/sdk");
            console.log("test")
            // Send the response to the user
           sdk.AsyncResponse();
           callback(null, new sdk.AsyncResponse());

        });
    }
    
    

};

