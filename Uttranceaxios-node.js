const axios = require('axios');
var botId          = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName        = "GenralBot";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var config         = require("./config");
var mockServiceUrl = config.examples.mockServicesHost + '/cabbot';
var { makeHttpCall } = require("./makeHttpCall");


const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
    
function fetchDataFromMockApi() {
            return axios.get(mockApiEndpoint)
                .then(function (response) {
                    const tableData = response.data;
                    return tableData;
                })
                .catch(function (err) {
                    throw err;
                });
        }

module.exports = {
    botId   : botId,
    botName : botName,

    // on_user_message : function(requestId, data, callback) {
    //     sdk.sendBotMessage(data, callback);
    // },
    // on_bot_message  : function(requestId, data, callback) {
    //     sdk.sendUserMessage(data, callback);
    // },
      
    on_webhook: function (requestId, payload, componentName, callback) {
        console.log('Incoming Request', payload.context.NLAnalysis.userInput);
        
    
         fetchDataFromMockApi()
            .then(function (tableData) {
                const userInput = payload.context.NLAnalysis.userInput;
                console.log(userInput);
    
                const found = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "Yes");
    
                let responseMessage;
    
                if (found) {
                    responseMessage = `Yes, Your input "${userInput}" is Eligible`;
                   
                } else {
                    responseMessage = `No, Your input "${userInput}" is not Eligible`;
                }
    
                // Construct a response payload
                const responsePayload = {
                    messages: [
                        {
                            role: 'system',
                            content: responseMessage,
                        }
                    ]
                };
                var response = responsePayload.messages[0].content
                console.log(response)
    
                // Use the 'callback' function to respond to the webhook request with the response payload
                callback(null, response);
            //     var sdk = require("./lib/sdk");
            //   sdk.respondToHook(response)
               
            })
            
            .catch(function (err) {
                console.error('Error:', err);
                callback({ error: 'Internal Server Error' });
            });
    }
    
    
    
};
