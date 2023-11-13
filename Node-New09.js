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

      
    on_webhook      : async function(requestId, payload, componentName, callback) {      
        
        console.log('Incoming Request', payload.context);
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
                 
                console.log(payload.context)
                console.log("Followup Intent", payload.context.FollowupIntents)
                console.log("itents list", payload.context.NLAnalysis.intents.successIntents)

                console.log("itent", payload.context.NLAnalysis.intents.successIntents.length) 
                var intentName;
                if(payload.context.NLAnalysis.intents.successIntents.length>0){
                    intentName = payload.context.NLAnalysis.intents.successIntents[0].intentName
                }
                else{
                    intentName = "Intent Not Found"
                }
                payload.context.data = {
                    targetIntent : payload.context.bot + "." + intentName,
                    userInput : userInput,
                    isEligible : found?"Yes":"No",
                    message : responseMessage
                };  
                             
                // console.log(payload.context.FollowupIntents)
                callback(null, payload);
               
            })
            
            .catch(function (err) {
                console.error('Error:', err);               
                payload.context.data = {
                    userInput : payload.context.NLAnalysis.userInput,
                    message : err.message
                };
                callback(null, payload);
            });
       
        
    }
};
