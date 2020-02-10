(function(window) {
    'use strict';

    let lettrController = {
        formatWordToArray: function() {
            this.wordLetterArray = [];

            for(let i = 0; i < app.lettrModel.selectedWord.length; i++) {
                this.wordLetterArray.push(app.lettrModel.selectedWord[i]);
            }

            return this.wordLetterArray;
        },
        wordFormatToDisplay: function(newLevel) {
            if(app.lettrView.formWordRadioOption.checked && !newLevel) {

                return app.lettrModel.selectedWord;

            } else {

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

            }

        },
        guessesAvailable: function() {
            let guessAvailable ={
                guessUsed: app.lettrModel.incorrectGuessCounter,
                guessAvailable: app.lettrModel.allowedGuesses - app.lettrModel.incorrectGuessCounter
            }

            return guessAvailable;
        },
        validateUserGuess: function(e) {
            e.preventDefault();
            let isGuessedWord = app.lettrView.formWordRadioOption.checked;

            let guess = app.lettrView.userGuessInput.value.toLowerCase().replace(/ /g, '');

            if(app.lettrView.formLetterRadioOption.checked) {

                app.lettrController.validateGuessedLetter(guess);

            } else if(isGuessedWord) {
                app.lettrController.isGuessDuplicate(guess, isGuessedWord);
                //app.lettrController.userGuessedWord(guess);

            } else {

                alert('Please select a guess option :)');

            }
            
        },
        validateGuessedLetter: function(guess){
            let regex = /^[a-zA-Z]+$/;

            if (guess.match(regex)){
                app.lettrController.isGuessDuplicate(guess);
            } else {
                alert('This is not a valid character. Please choose a letter of the alphabet :)');
                return;
            }
        },
        isGuessDuplicate: function(guess, isGuessedWord) {
            if(app.lettrModel.guessedLetters.includes(guess) || app.lettrModel.guessedWords.includes(guess)) {
                alert('You have already guessed this. Please chose a different guess :)');
                return;
            } else {
                this.checkUserGuess(guess, isGuessedWord);
            }
        },
        userGuessedWord: function(guess) {
            if(app.lettrModel.selectedWord === guess) {
                alert('That is the correct word! :)');
                app.lettrView.displayWord();
            } else {
                app.lettrModel.incorrectGuessCounter++;
                alert('That is not the correct word :(');
                app.lettrView.populateAvailableGuesses();
            }

            app.lettrView.populateGuessedElementContainers(app.lettrModel.guessedWords, app.lettrView.guessWordsContainer);
        },
        userGuessedLetter: function(guess) {
            if(this.wordLetterArray.includes(guess)) {
                alert('letter exists in word!');
                app.lettrView.displayWord();
            } else {
                app.lettrModel.incorrectGuessCounter++;
                alert('this letter is not found in the word :(');
                app.lettrView.populateAvailableGuesses();
            }

            app.lettrView.populateGuessedElementContainers(app.lettrModel.guessedLetters, app.lettrView.guessedLettersContainer, true);
        },
        checkUserGuess: function(guess, isGuessWord) {
            app.lettrModel.addGuessToArray(guess, isGuessWord);
            if(isGuessWord) {
                app.lettrController.userGuessedWord(guess);
            } else {
                app.lettrController.userGuessedLetter(guess);
            }

            this.checkIfGameOver();
        },
        checkIfGameOver: function() {
            if(app.lettrView.wordContainter.innerText === app.lettrModel.selectedWord) {
                this.UserWins();
            } else if(app.lettrModel.incorrectGuessCounter === app.lettrModel.allowedGuesses) {
                this.UserLoses();
            } else {
                return;
            }
        },
        UserWins: function() {
            alert('you win!!!');
            app.lettrModel.userScore++;
            app.lettrView.populateUserScore(app.lettrModel.userScore);
            this.startNewLevel();
        },
        UserLoses: function() {
            alert('You lose :(');
            this.startNewGame();
        },
        startNewLevel: function() {
            app.lettrModel.clearBoardModel();
            app.lettrView.clearBoardView();
            app.lettrView.displayWord(true);
        },
        startNewGame:function() {
            app.lettrModel.clearBoardModel(true);
            app.lettrView.clearBoardView();
            app.lettrView.render();
        },
        init: function() {
            app.lettrModel.init();
            app.lettrView.init();
            app.lettrView.populateUserScore(app.lettrModel.userScore);
        }
    }

    window.app = window.app || {};
    window.app.lettrController = lettrController;
    app.lettrController.init();
})(window);