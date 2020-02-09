(function(window) {
    'use strict';

    let lettrModel = {
        wordBank: [
            'yet',
            'another',
            'test'
        ],
        incorrectGuessCounter: 0,
        guessedLetters: [],
        guessedWords: [],
        selectedWord: '',
        allowedGuesses: 6,
        userScore: 0,
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
        clearBoardModel() {
            this.guessedLetters = [];
            this.guessedWords = [];

            this.selectRandomWordKey();
        },
        init: function() {
            this.selectRandomWordKey();
        }
    }

    window.app = window.app || {};
    window.app.lettrModel = lettrModel;
})(window);