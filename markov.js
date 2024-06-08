/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */


    makeChains() {
        let chain = new Map();
    
        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i];
            let nextWord = this.words[i + 1] || null;
    
            if (chain.has(word)) {
                chain.get(word).push(nextWord);
            } else {
                chain.set(word, [nextWord]);
            }
        }
    
        this.chain = chain;
        // console.log(chain);
    }

    static choice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        let markovKeys = [...this.chain.keys()]; // make an array from chain map key values
        let randomKey = MarkovMachine.choice(markovKeys);
        let markovOutput = [];

        // produce markov chain until reaching termination word
        while (markovOutput.length < numWords && randomKey !== null) {
            markovOutput.push(randomKey);
            randomKey = MarkovMachine.choice(this.chain.get(randomKey)); //update random key value to one of the possible next words that is mapped in chain
        }

        return markovOutput.join(" ");
    }
}


// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.makeChains());
// console.log(mm.makeText(numWords=25));



module.exports = {
    MarkovMachine,
};