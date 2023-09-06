/* eslint-disable no-undef */
const https = require("https");

function printErr(error) {
  console.error(error.message);
}

function getDefinition(term) {
  try {
    // Request Data
    const request = https.get(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${apiKey}`,
      (response) => {
        let responseBody = "";
        // console.dir(response.statusCode);
        response.on("data", (data) => {
          responseBody += data.toString();
        });
        // Parse Data
        try {
          response.on("end", () => {
            const definition = JSON.parse(responseBody);
            // Format Data
            // Return Data
            console.log(definition[0].shortdef);
          });
        } catch (error) {
          printErr(error);
        }
      }
    );
    request.on("error", (error) => printErr(error));
  } catch (error) {
    printErr(error);
  }
}

const query = process.argv.slice(3);
let apiKey = process.argv[2];
if (apiKey.length !== 36) {
  console.error("Please enter a valid API key!");
}
query.forEach(getDefinition);
