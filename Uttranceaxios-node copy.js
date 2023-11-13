const axios = require('axios');
var botId          = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName        = "GenralBot";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var config         = require("./config");
var mockServiceUrl = config.examples.mockServicesHost + '/cabbot';
var { makeHttpCall } = require("./makeHttpCall");
// const Redis = require('ioredis');
// const redis = new Redis();
// const value = await redis.hgetAsync('myHash', 'myKey');
// const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';

// function fetchData(/*userLoc*/) {
//     return new Promise(function(resolve, reject) {
//         makeHttpCall(
//             'get',
//             // mockServiceUrl + '/findcabs'
//             mockApiEndpoint
//         )
//         .then(function(res) {
//             console.log("abc");
//             resolve(res);
            
//         })
//         .catch(function(err){
//             return reject(err);
//         })
//     });
// }

// function fetchDataFromMockApi( ) {
//     // Simulate making an API request to the mock endpoint
//     fetch(mockApiEndpoint)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             callback(data);
            
//         })
//         .catch(error => {
//             console.error('Error fetching data from the mock API:', error);
//             callback([]);
//         });
// }

module.exports = {
    botId   : botId,
    botName : botName,

    // on_user_message : function(requestId, data, callback) {
    //     sdk.sendBotMessage(data, callback);
    // },
    // on_bot_message  : function(requestId, data, callback) {
    //     sdk.sendUserMessage(data, callback);
    // },
      
    on_webhook: async function(requestId, payload, componentName, callback) {
        console.log('Incoming Request', payload.context.NLAnalysis.userInput);
        try {
            // Get the user input from the request query
            const userInput = payload.context.NLAnalysis.userInput;
    
            // Define the mock API endpoint
            const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
    
            // Make a GET request to the mock API to retrieve its data
            const response = await axios.get(mockApiEndpoint);
    
            // Extract the data from the response
            const mockApiData = response.data;
            console.log(mockApiData);
    
            // Now you can compare the user input with the data from the mock API
            const match = mockApiData.some(item => item.IntentName === userInput);
    
            if (match) {
                // Use the 'callback' function to respond to the webhook request with a JSON object
                callback(null, { msg: 'User input matches mock API data' });
            } else {
                callback(null, { msg: 'User input does not match mock API data' });
            }
        } catch (error) {
            console.error('Error:', error);
            // Use the 'callback' function to handle errors with a JSON object
            callback({ error: 'Internal Server Error' });
        }
    }
    
    
};
