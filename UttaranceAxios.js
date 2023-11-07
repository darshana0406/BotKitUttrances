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
// const axios = require('axios');

module.exports = {
    botId: 'st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e', 
    botName: 'GenralBot',

    // on_user_message : function(requestId, data, callback) {        
    //     sdk.sendBotMessage(data, callback);       
    // },
    // on_bot_message  : function(requestId, data, callback) {
    //     sdk.sendUserMessage(data, callback);
    // },
    on_webhook: function (requestId, payload, componentId, callback) {
        console.log(payload.context.intent);
        console.log(payload.context.NLAnalysis.userInput);
        const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
    
        // Import the 'axios' library for making HTTP requests
        const axios = require('axios');
    
        function fetchDataFromMockApi(callback) {
            // Simulate making an API request to the mock endpoint
            axios.get(mockApiEndpoint)
                .then(response => {
                    callback(response.data);
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
            const found = tableData.some(row => row.IntentName === userInput);
    
            // Perform actions based on the result of the comparison
            if (found) {
                console.log(`User input "${userInput}" exists in the data table.`);
                // Define the data to send to Kore.ai
                const dataToSend = { text: 'It Exists' };
    
                // Define the Kore.ai webhook URL
                const koreAiWebhookUrl = 'https://bots.kore.ai/chatbot/v2/webhook/st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e';
    
                // Define any authentication headers if needed
                const auth = {                    
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWUwMmEyYzc4LWI2OTUtNWRjZi04ZWI1LTAxYjRiMGU4MGM0ZSIsInN1YiI6IjEyMzQ1In0.GnFidgXTUK5imBAsO_KXU50BNGBz5Kq6h9PIw-OWqbs',
                        'Content-Type' : 'application/json'
                  
                };
    
                // Send the data to Kore.ai using the 'axios' library
                axios.post(koreAiWebhookUrl, dataToSend, {auth})
                    .then(response => {
                        // Handle the response from Kore.ai if needed
                        console.log('Kore.ai response:', response.data);
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error('Error sending data to Kore.ai:', error);
                    });
            } else {
                console.log(`User input "${userInput}" does not exist in the data table.`);
                // Perform a different action
            }
    
            // Continue with the conversation or respond to the user
            callback();
        });
    }
    
    


};

