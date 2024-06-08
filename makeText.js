/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov");

function textMarkov (path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error trying to read ${path}: ${err}`);
            process.exit(1);
        }
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
    })
}

async function webMarkov (url) {
    try {
        const response = await axios.get(url);
        let mm = new markov.MarkovMachine(response.data);
        console.log(mm.makeText());
    } catch (err) {
        console.log(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}

// process.argv[2] would be file text or url in: node step2.js (url or text file)
let method = process.argv[2];
let path = process.argv[3];

if (method === 'url') {
    webMarkov(path);
} else if (method === 'file') {
    textMarkov(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);    
}