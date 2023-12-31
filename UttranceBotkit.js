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
const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';

function fetchData(/*userLoc*/) {
    return new Promise(function(resolve, reject) {
        makeHttpCall(
            'get',
            // mockServiceUrl + '/findcabs'
            mockApiEndpoint
        )
        .then(function(res) {
            console.log("abc");
            resolve(res);
            
        })
        .catch(function(err){
            return reject(err);
        })
    });
}

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

    on_user_message : function(requestId, data, callback) {
        sdk.sendBotMessage(data, callback);
    },
    on_bot_message  : function(requestId, data, callback) {
        sdk.sendUserMessage(data, callback);
    },
      
    on_webhook      : async function(requestId, payload, componentName, callback) {      
        
        console.log('Incoming Request', payload.context.NLAnalysis.userInput);
       
        // console.log(payload.context.NLAnalysis.userInput)
        // const userInput = data.context.NLAnalysis.userInput;
        // // const found = tableData.some(row => row.IntentName === userInput && row.IntentEligibility === "Yes");
        fetchData()        
        // // sdk.saveData(requestId)
        .then(function(payload) {            
            console.log(payload)           
            // sdk.respondToHook(payload);
            // sdk.sendUserMessage(payload)
            callback();
        });
        // .then(payload => {
        //     // context.pay = data;    
            // console.log(payload);       
            // callback(null, payload);
            
        // });
        
        // fetchDataFromMockApi(function (userInput) {
        //     
        //     console.log(responsePayload)            
        //     var sdk = require("./lib/sdk");
        //     console.log("test")
        //     // Send the response to the user
        //     sdk.respondToHook(message, responsePayload);

        //     sdk.AsyncResponse()
        //    callback(null, new sdk.AsyncResponse());
            

        // });
        
    }
};
