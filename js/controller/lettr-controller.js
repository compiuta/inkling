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
        wordFormatToDisplay: function(newLevel, newGame) {

            if((app.lettrView.formWordRadioOption.checked && !newLevel) || newGame || (app.lettrModel.incorrectGuessCounter === 6)) {

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
                app.lettrView.userGuessInput.value = '';
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
                app.lettrView.showUserMessage(app.lettrModel.alertMessages.correctLetter, 'guess-success');
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
            app.lettrView.populateUserScore(app.lettrModel.userScore);
            if(continueButtonClicked) {
                
                this.startNewLevel();
                app.lettrView.toggleAlertBox();
                app.lettrView.toggleButtonView();
                app.lettrView.toggleUserForm();
                app.lettrView.alertBoxButton.removeEventListener('click', app.lettrView.userWinsListener);
            } else {
                app.lettrModel.userScore++;

                if(app.lettrModel.wordBank.length > 0) {
                    app.lettrView.addAlertButtonListener(true);
                    app.lettrView.showUserMessage(app.lettrModel.alertMessages.correctWord, 'guess-success', true, true, 'Next Level');
                    app.lettrView.toggleUserForm();
                } else {
                    app.lettrController.noMoreWords();
                }
            }
        },
        UserLoses: function() {
            app.lettrView.toggleUserForm();
            app.lettrView.showUserMessage(app.lettrModel.alertMessages.userLoses,'guess-warning', true, true, 'Start New Game');
            app.lettrView.addAlertButtonListener();
            app.lettrView.displayWord(false, true);
        },
        startNewLevel: function() {
            app.lettrModel.clearBoardModel();
            app.lettrView.clearBoardView();
            app.lettrView.displayWord(true);
        },
        startNewGame:function() {
            app.lettrView.startOverlayToggle();
            app.lettrModel.clearBoardModel(false, true);
            app.lettrView.clearBoardView();
            app.lettrView.toggleAlertBox();
            app.lettrView.toggleButtonView();
            app.lettrView.toggleUserForm();
            app.lettrView.populateAvailableGuesses();
            app.lettrView.alertBoxButton.removeEventListener('click', app.lettrController.startNewGame);
            app.lettrModel.incorrectGuessCounter = 0;
            app.lettrModel.userScore = 0;
            app.lettrView.populateUserScore(app.lettrModel.userScore);
        },
        noMoreWords: function() {
            app.lettrView.toggleUserForm();
            app.lettrView.showUserMessage(app.lettrModel.alertMessages.noWords, 'guess-success', true, true, 'Start New Game');
            app.lettrView.addAlertButtonListener();
        },
        startUserInitializedGame: function(e) {
            e.preventDefault();

            let wordToPopulate = app.lettrView.userUniqueWordInput.value.toLowerCase().replace(/ /g, '');

            if(wordToPopulate === ''){
                return;
            } else {
                app.lettrModel.selectedWord = wordToPopulate;
                app.lettrView.populateOverlaySelectedWord(wordToPopulate);
                app.lettrView.userUniqueWordInput.value = '';
            }
        },
        userInputInit: function() {
            app.lettrView.showUserWordInputForm();
        },
        presetInit: function() {
            app.lettrModel.init();
            app.lettrView.render();
            app.lettrView.startOverlayToggle();
        },
        init: function() {
            app.lettrView.init();
            app.lettrView.populateUserScore(app.lettrModel.userScore);
        }
    }

    window.app = window.app || {};
    window.app.lettrController = lettrController;
    app.lettrController.init();
})(window);