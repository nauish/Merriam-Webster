const https = require('https');
function getData(term) {
    try {
        // Request Data
        const request = https.get(
            `https://dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=`,
             (response) => {
                let body = '';
                // console.dir(response.statusCode);
                response.on('data', (data) => {
                    body += data.toString();
                });
                // Parse Data
                response.on('end', () => {
                    const def = JSON.parse(body);
                    // Format Data
                    // Return Data
                    console.log(def[0].shortdef)
                })
             });
    }
    catch (error){
        console.error(error.message);
    }
}

const query = process.argv.slice(2);
query.forEach(getData);