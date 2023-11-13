const axios = require('axios');
var botId = "st-0b7bf433-ef56-54c9-9574-f6c3b0983a9e";
var botName = "GeneralBot";
var sdk = require("./lib/sdk");
var config = require("./config");
var mockServiceUrl = config.examples.mockServicesHost + '/cabbot';
var { makeHttpCall } = require("./makeHttpCall");

const mockApiEndpoint = 'https://65437f2501b5e279de2076dd.mockapi.io/api/IntentEligibility';

async function fetchDataFromMockApi() {
    try {
        const response = await axios.get(mockApiEndpoint);
        const tableData = response.data;
        return tableData;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    botId: botId,
    botName: botName,

    on_webhook: async function (requestId, payload, componentName, callback) {
        console.log('Incoming Request', payload.context.NLAnalysis.userInput);

        try {
            const tableData = await fetchDataFromMockApi();
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

            var response = responsePayload.messages[0].content;
            console.log(response);

            // Use the 'callback' function to respond to the webhook request with the response payload
            callback(null, response);
        } catch (err) {
            console.error('Error:', err);
            callback({ error: 'Internal Server Error' });
        }
    }
};
