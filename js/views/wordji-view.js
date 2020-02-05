(function(window){
    'use-strict';

    let wordjiView = {
        displayWord: function(word) {
            this.wordContainter.innerText = app.wordjiController.wordFormatToDisplay();;
        },
        getDomElements: function() {
            this.guessedLettersContainer = document.querySelector('[data-js="guessed-letters"]');
            this.wordContainter = document.querySelector('[data-js="word-container"]');
            this.userGuessInput = document.querySelector('[data-js="user-guess-input"]');
            this.userGuessSubmit = document.querySelector('[data-js="user-guess-submit"]');
        },
        init: function() {
            this.getDomElements();
            this.displayWord();
        }
    }

    window.app = window.app || {};
    window.app.wordjiView = wordjiView;
})(window);