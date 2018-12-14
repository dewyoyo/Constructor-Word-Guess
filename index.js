// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//// Constructor initialize
var Word = require("./word.js");
var inquirer = require("inquirer");

// List of words to choose from
var wordList = ["discrete", "guru", "summit", "cumbersome", "relish", "frayed", "fleet", "reinforce", "eloquent", "respectively",
"procrastination", "conundrum", "aesthetically", "recipient", "indecipherable", "dissect", "sleuthing", "labyrinth", "disparage", "tribute",
"typography", "confrontation", "enhancement", "proactively", "radically"];

// Pick Random index from wordList array
var randomIndex = Math.floor(Math.random() * wordList.length);
var randomWord = wordList[randomIndex];

// Pass random word through Word constructor
gameWord = new Word(randomWord);

var newGame = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];
var guessedLetters = [];


// Guesses left
var guessesLeft = 10;

// Its how we we will start and restart the game.
function startGame() {

    // Generates new word for Word constructor if true
    if (newGame) {
        // Selects random wordList array
        var randomIndex = Math.floor(Math.random() * wordList.length);
        var randomWord = wordList[randomIndex];

        // Passes random word through the Word constructor
        gameWord = new Word(randomWord);
        newGame = false;
    }

    // Test if a letter guessed is correct
    var wordComplete = [];
    gameWord.wordArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput",
                    validate: function(value) {
                        var pass = value.match(
                          /[abcdefghijklmnopqrstuvwxyz]/i
                        );
                        if (pass) {
                          return true;
                        }
                  
                        return 'Please enter a valid alphabet';
                      }
                }
            ])
            .then(function (input) {   
                if (input.userinput.length > 1) {
                    console.log("\nPlease enter one alphabet!\n");
                    startGame();
                } else {                
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        startGame();
                    } else {
                        // Checks if guess is correct
                        var wordCheckArray = [];
                    
                        gameWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        gameWord.wordArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }
                     
                        gameWord.show();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            startGame();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }
           
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");
        restartGame();
    }
  
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Want to do one more game?",
                choices: ["Yes", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Yes") {
                newGame = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                startGame();
            } else {
                return;
            }
        })
}

startGame();