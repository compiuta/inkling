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

            } else {

                alert('Please select a guess option :)');

            }
            
        },
        validateGuessedLetter: function(guess){
            let regex = /^[a-zA-Z]+$/;

            if (guess.match(regex)){
                app.lettrController.isGuessDuplicate(guess);
            } else {
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.invalidCharacter);
                return;
            }
        },
        isGuessDuplicate: function(guess, isGuessedWord) {
            if(app.lettrModel.guessedLetters.includes(guess) || app.lettrModel.guessedWords.includes(guess)) {
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.duplicateGuess);
                return;
            } else {
                
                this.checkUserGuess(guess, isGuessedWord);
            }
        },
        userGuessedWord: function(guess) {
            
            if(app.lettrModel.selectedWord === guess) {
                app.lettrView.displayWord();
            } else {
                app.lettrModel.incorrectGuessCounter++;
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.incorrectWord);
                app.lettrView.populateAvailableGuesses();
            }

            app.lettrView.populateGuessedElementContainers(app.lettrModel.guessedWords, app.lettrView.guessWordsContainer);
        },
        userGuessedLetter: function(guess) {
            if(this.wordLetterArray.includes(guess)) {
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.correctLetter);
                app.lettrView.displayWord();
            } else {
                app.lettrModel.incorrectGuessCounter++;
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.incorrectLetter);
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
        UserWins: function(continueButtonClicked) {
            if(continueButtonClicked) {
                app.lettrView.populateUserScore(app.lettrModel.userScore);
                this.startNewLevel();
                app.lettrView.toggleAlertBox();
                app.lettrView.toggleButtonView();
                app.lettrView.toggleUserForm();
                app.lettrView.alertBoxButton.removeEventListener('click', app.lettrView.userWinsListener);
            } else {
                app.lettrView.addAlertButtonListener(true);
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.correctWord, true, true);
                app.lettrModel.userScore++;
                app.lettrView.toggleUserForm();
            }
        },
        UserLoses: function() {
            app.lettrView.toggleUserForm();
            app.lettrView.showUserMessage(app.lettrModel.alertMessages.userLoses, true, true);
            app.lettrView.addAlertButtonListener();
        },
        startNewLevel: function() {
            app.lettrModel.clearBoardModel();
            app.lettrView.clearBoardView();
            app.lettrView.displayWord(true);
        },
        startNewGame:function() {
            app.lettrModel.clearBoardModel(true);
            app.lettrView.clearBoardView();
            app.lettrView.toggleAlertBox();
            app.lettrView.toggleButtonView();
            app.lettrView.toggleUserForm();
            app.lettrView.displayWord(true);
            app.lettrView.populateAvailableGuesses();
            app.lettrView.alertBoxButton.removeEventListener('click', app.lettrController.startNewGame);
            app.lettrModel.userScore = 0;
            app.lettrView.populateUserScore(app.lettrModel.userScore);
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