(function(window) {
    'use strict';

    let lettrModel = {
        words: [
            'yet',
            'another',
            'test'
        ],
        wordBank: [],
        incorrectGuessCounter: 0,
        guessedLetters: [],
        guessedWords: [],
        selectedWord: '',
        allowedGuesses: 6,
        userScore: 0,
        populateWordBank: function() {
            this.wordBank = [];

            for(let i = 0; i < this.words.length; i++) {
                this.wordBank.push(this.words[i]);
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
        clearBoardModel: function(newGame) {

            this.guessedLetters = [];
            this.guessedWords = [];

            if(newGame) {
                this.incorrectGuessCounter = 0;
                this.populateWordBank();
            }

            this.selectRandomWordKey();
        },
        init: function() {
            this.populateWordBank();
            this.selectRandomWordKey();
        }
    }

    window.app = window.app || {};
    window.app.lettrModel = lettrModel;
})(window);