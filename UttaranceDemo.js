const request = require('request'); 
var botId = "st-0a7cce62-51d2-5f57-b1c0-024923d5b580";
var botName = "Demobot1";
var sdk = require("./lib/sdk");
var botVariables = {};
var langArr = require('./config.json').languages;
var _ = require('lodash');
var dataStore = require('./dataStore.js').getInst();
var first = true;
var anythingelse = false;
module.exports = {
  botId: 'st-0a7cce62-51d2-5f57-b1c0-024923d5b580', 
  botName: 'Demobot1',
 
on_user_message : function(requestId, data, callback) {
  if (data.message == "Internet Issue" && anythingelse==true)
  {
      data.message = "Uttarance Mached" 
      return sdk.sendUserMessage(data, callback);
  } else if(anythingelse==true){
      data.message = "Uttarance NotMached"
      return sdk.sendUserMessage(data, callback);
  }  
  sdk.sendBotMessage(data, callback);
},
on_bot_message: function(requestId, data, callback) {
  // fetchAllBotVariables(data);
  console.log(data.context.intentName);
  //Sends back the message to user
  if(data.context.intentName === "AnythingElse"){  
      data.message = "Anything Else you need?"  
      anythingelse = true;     
  }

  return sdk.sendUserMessage(data, callback);
}
// Function to make the API request


};



  