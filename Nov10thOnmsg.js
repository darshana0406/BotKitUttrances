const axios = require('axios');
var botId          = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName        = "GenralBot";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var config         = require("./config");

// const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';
    
// function fetchDataFromMockApi() {
//             return axios.get(mockApiEndpoint)
//                 .then(function (response) {
//                     const tableData = response.data;
//                     return tableData;
//                 })
//                 .catch(function (err) {
//                     throw err;
//                 });
//         }

module.exports = {
    botId   : botId,
    botName : botName,

    // on_user_message : function(requestId, data, callback) {
    //     if(data.message === "paybill"){
		
    //         var a = data.message;
    //         var b = a.replace("platform", "response from Botkit");
    //         data.message = b;
    //         return sdk.sendBotMessage(data, callback);
    //         }
    //     },
    //     on_bot_message  : function(requestId, data, callback) {
    //         sdk.sendUserMessage(data, callback);
    
    //     },
    on_webhook : function(requestId, payload, callback) {      
        payload.message ="Showmybill"
        return sdk.sendBotMessage(payload, callback); 
     
       }  
       
}

 