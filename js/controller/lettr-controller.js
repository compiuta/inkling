(function(window) {
    'use-strict';

    let lettrController = {
        formatWordToArray: function() {
            this.wordLetterArray = [];

            for(let i = 0; i < app.lettrModel.selectedWord.length; i++) {
                this.wordLetterArray.push(app.lettrModel.selectedWord[i]);
            }

            return this.wordLetterArray;
        },
        wordFormatToDisplay: function() {
            this.formatWordToArray();
            
            this.wordToDisplay = '';

            for(let i = 0; i < this.wordLetterArray.length; i++) {
                if(app.lettrModel.guessedLetters.includes(this.wordLetterArray[i])) {
                    this.wordToDisplay += this.wordLetterArray[i]
                } else {
                    this.wordToDisplay += ' _ ';
                }
            }

            return this.wordToDisplay;
        },
        guessesAvailable: function() {
            let guessAvailable ={
                guessUsed: app.lettrModel.guessCounter,
                guessAvailable: app.lettrModel.allowedGuesses - app.lettrModel.guessCounter
            }

            return guessAvailable;
        },
        validateUserGuess: function(e) {
            e.preventDefault();
    
            let guess = app.lettrView.userGuessInput.value;
            let regex=/^[a-zA-Z]+$/;

            if (guess.match(regex)){
                app.lettrController.isGuessDuplicate(guess);
            } else {
                alert('This is not a valid character. Please choose a letter of the alphabet :)');
                return;
            }
        },
        isGuessDuplicate: function(guess) {
            if(app.lettrModel.guessedLetters.includes(guess)) {
                alert('You have already guessed this letter please choose a different letter :)');
                return;
            } else {
                this.checkUserGuess(guess);
            }
        },
        checkUserGuess: function(guess) {
            app.lettrModel.guessedLetters.push(guess);

            if(this.wordLetterArray.includes(guess)) {
                alert('letter exists in word!');
                app.lettrView.displayWord();
            } else {
                app.lettrModel.guessCounter++;
                alert('this letter is not found in the word :(');
                app.lettrView.populateAvailableGuesses();
            }

            app.lettrView.populateSelectedLetters(app.lettrModel.guessedLetters);
        },
        init: function() {
            app.lettrModel.init();
            app.lettrView.init();
        }
    }

    window.app = window.app || {};
    window.app.lettrController = lettrController;
    app.lettrController.init();
})(window);