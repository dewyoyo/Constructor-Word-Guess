// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
var Letter = require("./Word.js");
//   * Randomly selects a word and uses the `Word` constructor to store it
var wordList = ["discrete", "guru", "summit", "cumbersome", "relish", "frayed", "fleet", "reinforce", "eloquent", "respectively",
    "procrastination", "conundrum", "aesthetically", "recipient", "indecipherable", "dissect", "sleuthing", "labyrinth", "disparage", "tribute",
    "typography", "confrontation", "enhancement", "proactively", "radically"];


var gameword = wordList[Math.floor(Math.random() * wordList.length)];
var selectWord = new Word(gameword);

console.log("selectWord : " + selectWord.currentWord);

//   * Prompts the user for each guess and keeps track of the user's remaining guesses
var inquirer = require("inquirer");

console.log('Hi, welcome to HANGMAN with node.js');

var startQ = [
    {
        type: 'confirm',
        name: 'toStart',
        message: 'Want to start a Hangman Game?',
        default: false
    }
];


// var ui = new inquirer.ui.BottomBar();

// // pipe a Stream to the log zone
// outputStream.pipe(ui.log);

// // Or simply write output
// ui.log.write('something just happened.');
// ui.log.write('Almost over, standby!');

// // During processing, update the bottom bar content to display a loader
// // or output a progress bar, etc
// ui.updateBottomBar('new bottom bar content');



// var BottomBar = require('./node_modules/inquirer/lib/ui/bottom-bar');
// var loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
// var i = 4;
// var ui = new BottomBar({ bottomBar: loader[i % 4] });
// setInterval(() => {
//   ui.updateBottomBar(loader[i++ % 4]);
// }, 300);
// ui.updateBottomBar('Installation done!\n');
// process.exit();


inquirer.prompt(startQ).then(startAnswers => {
    if (startAnswers.toStart) {
        // console.log(JSON.stringify(startAnswers, null, '  '));

        // var BottomBar = require('./node_modules/inquirer/lib/ui/bottom-bar');
        // var ui = new BottomBar();
        // ui.updateBottomBar('What is your guessing letter?\n');

        var guessLetter = [
            {
                type: 'input',
                name: 'guessletter',
                message: 'What is your guessing letter?',
                filter: function (val) {
                    return val.toLowerCase();
                },
                validate: function (value) {
                    // if (value.length == 1 && typeof(parseInt(value)) != "number" ) {
                    if (value.length == 1) {
                        return true;
                    };

                    // var pattern = new RegExp([a-zA-Z]);
                    // console.log(pattern);
                    // console.log(val.test(pattern));
                    // if (val.test(pattern)) {
                    //     return true;
                    // }
                    return 'Please enter a letter.';
                }
            }
        ];
        inquirer.prompt(guessLetter).then(guessAnswers => {
            console.log(JSON.stringify(guessAnswers, null, '  '));
            
        })

    }
    else {
        console.log('\nBye, Bye!!');
    }
    // process.exit();

});

