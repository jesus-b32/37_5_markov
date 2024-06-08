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

// example: node makeText.js file eggs.txt
// example: node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
let method = process.argv[2];
let path = process.argv[3];

if (method === 'url') {
    webMarkov(path);
} else if (method === 'file') {
    textMarkov(path);
} else {
    console.error(`Unknown method used: ${method}`);
    process.exit(1);    
}