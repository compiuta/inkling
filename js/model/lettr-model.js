(function(window) {
    'use-strict';

    let lettrModel = {
        wordBank: {
            0: 'yet',
            1: 'another',
            2: 'test'
        },
        guessCounter: 0,
        guessedLetters: [],
        guessedWords: [],
        selectedWord: '',
        allowedGuesses: 6,
        selectRandomWordKey: function() {
            let randomKey = Math.floor(Math.random() * Object.keys(this.wordBank).length);
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
            delete this.wordBank[randomKey];
        },
        init: function() {
            this.selectRandomWordKey();
        }
    }

    window.app = window.app || {};
    window.app.lettrModel = lettrModel;
})(window);