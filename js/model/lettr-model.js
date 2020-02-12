(function(window) {
    'use strict';

    let lettrModel = {
        words: [
            'condition',
            'feed',
            'tool',
            'total',
            'basic',
            'smell',
            'valley',
            'nor',
            'double',
            'seat',
            'continue',
            'block',
            'chart',
            'hat',
            'sell',
            'success',
            'company',
            'subtract',
            'event',
            'particular',
            'deal',
            'swim',
            'term',
            'opposite',
            'wife',
            'shoe',
            'shoulder',
            'spread',
            'arrange',
            'camp',
            'invent',
            'cotton',
            'born',
            'determine',
            'quart',
            'nine',
            'truck',
            'noise',
            'level',
            'chance',
            'gather',
            'shop'
        ],
        wordBank: [],
        incorrectGuessCounter: 0,
        guessedLetters: [],
        guessedWords: [],
        selectedWord: '',
        allowedGuesses: 6,
        userScore: 0,
        alertMessages: {
            invalidCharacter: 'This is not a valid character. Please choose a letter of the alphabet.',
            duplicateGuess: 'You have already guessed this. Please make a different guess.',
            correctWord: 'That is the correct word!',
            incorrectWord: 'That is not the correct word.',
            correctLetter: 'Letter exists in the word!',
            incorrectLetter: 'This letter is not found in the word.',
            userWins: 'You Win!!!',
            userLoses: 'You Lose',
            noWords: 'Congratulations! You have correctly guessed all words.'
        },
        populateWordBank: function(userSelectedWord) {
            this.wordBank = [];

            if(userSelectedWord) {
                this.wordBank.push(userSelectedWord);
            } else {
                for(let i = 0; i < this.words.length; i++) {
                    this.wordBank.push(this.words[i]);
                }
            }
            
        },
        selectRandomWordKey: function() {
            let randomKey = Math.floor(Math.random() * this.wordBank.length);
            this.selectedWord = this.wordBank[randomKey];
            this.removeSelectedWord(randomKey);
        },
        addGuessToArray: function(guess, isGuessWord) {
            if(isGuessWord) {
                this.guessedWords.push(guess);
            } else {
                this.guessedLetters.push(guess);
                this.guessedLetters.sort();
            }
        },
        removeSelectedWord: function(randomKey) {
            this.wordBank.splice(randomKey, 1);
        },
        clearBoardModel: function(newGame, startOver) {

            this.guessedLetters = [];
            this.guessedWords = [];

            if(newGame) {
                this.incorrectGuessCounter = 0;
                this.populateWordBank();
            }

            if(!startOver) {
                this.selectRandomWordKey();
            }
        },
        init: function() {
            this.populateWordBank();
            this.selectRandomWordKey();
        }
    }

    window.app = window.app || {};
    window.app.lettrModel = lettrModel;
})(window);