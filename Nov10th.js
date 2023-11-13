const axios = require('axios');
var botId          = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName        = "GenralBot";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var config         = require("./config");

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
   
      
    on_webhook : async function(requestId, payload, componentName, callback) {   
        console.log(payload)   
        console.log(payload.context.NLAnalysis.intents)
        
        try {
            let response = await fetchDataFromMockApi()

        if(payload.context.NLAnalysis.intents.successIntents.length){
        let maxScore = payload.context.NLAnalysis.intents.successIntents.reduce(function(prev, current) { return (prev && prev.score > current.score) ? prev : current}) //returns object

        let matchedIntent = response.find((obj)=>{ return obj.IntentName == maxScore.intentName });
        // payload.context.data = matchedIntent
        console.log("Name", matchedIntent.IntentName)
        payload.message = matchedIntent.IntentName;
        return sdk.sendBotMessage(payload, callback); 
        }     
            
        } catch (err) {
            console.log(err)
             payload.context.data = {
             message : err.message

        };
        callback(null, payload);    
        }

       
}
}
