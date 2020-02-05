(function(window) {
    'use-strict';

    let wordjiController = {
        formatWordToArray: function() {
            this.wordLetterArray = [];

            for(let i = 0; i < app.wordjiModel.selectedWord.length; i++) {
                this.wordLetterArray.push(app.wordjiModel.selectedWord[i]);
            }

            return this.wordLetterArray;
        },
        wordFormatToDisplay: function() {
            this.formatWordToArray();
            

            this.wordToDisplay = '';

            for(let i = 0; i < this.wordLetterArray.length; i++) {
                if(app.wordjiModel.guessedLetters.includes(this.wordLetterArray[i])) {
                    this.wordToDisplay += this.wordLetterArray[i]
                } else {
                    this.wordToDisplay += ' _ ';
                }
            }

            return this.wordToDisplay;
        },
        init: function() {
            app.wordjiModel.init();
            app.wordjiView.init();
        }
    }

    window.app = window.app || {};
    window.app.wordjiController = wordjiController;
})(window);