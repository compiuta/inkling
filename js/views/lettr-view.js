(function(window){
    'use strict';

    let lettrView = {
        displayWord: function(newLevel, newGame) {
            this.wordContainter.innerText = app.lettrController.wordFormatToDisplay(newLevel);
        },
        setGuessInputMaxLength: function() {
            app.lettrView.userGuessInput.value = '';

            if(app.lettrView.formLetterRadioOption.checked) {
                app.lettrView.userGuessInput.setAttribute('maxlength', '1');
                app.lettrView.userGuessInput.setAttribute('placeholder', 'Input Letter');
            } else {
                app.lettrView.userGuessInput.removeAttribute('maxlength');
                app.lettrView.userGuessInput.setAttribute('placeholder', 'Input Word');
            }
        },
        createAvailableGuessElement: function(isUsed) {
            let isGuessAvailable = document.createElement('div');
            isGuessAvailable.classList.add('guess-available');
            if(isUsed) {
                isGuessAvailable.classList.add('guess-used');
            } else {
                isGuessAvailable.classList.add('guess-not-used');
            }

            return isGuessAvailable;
        },
        populateUserScore: function(userScore) {
            this.userScoreContainer.innerText = userScore;
        },
        populateAvailableGuesses: function() {
            let fragment = document.createDocumentFragment();
            let guessAvailableObject = app.lettrController.guessesAvailable();
            app.lettrView.availableGuessesContainer.innerText = guessAvailableObject.guessAvailable;
        },
        createGuessedElementContainer: function(isLetter) {
            let guessedElement = document.createElement('div');

            if(isLetter) {
                guessedElement.classList.add('guessed-letter');
            } else {
                guessedElement.classList.add('guessed-word');
            }

            return guessedElement;
        },
        populateGuessedElementContainers: function(data, container, isLetter) {
            container.innerHTML = '';

            let fragment =  document.createDocumentFragment();

            for(let i = 0; i < data.length; i++) {
                let guessedElement = this.createGuessedElementContainer(isLetter);
                guessedElement.innerText = data[i];
                fragment.appendChild(guessedElement);
            }
            
            container.appendChild(fragment);
        },
        toggleUserForm: function() {
            this.userGuessForm.classList.toggle('hide');
        },
        toggleAlertBox: function() {
            app.lettrView.alertBox.classList.toggle('hide');
        },
        toggleButtonView: function(buttonText) {
            this.alertBoxButton.classList.toggle('hide');
            if(buttonText) {
                this.alertBoxButton.innerText = buttonText;
            }
        },
        toggleLandingPage: function() {
            if(app.lettrView.bodyTag.classList.contains('landing-page')){
                app.lettrView.fadeOutLandingpage();
            } else {
                app.lettrView.bodyTag.classList.toggle('landing-page');
            }
        },
        fadeOutLandingpage: function() {
            app.lettrView.bodyTag.classList.add('landing-page-fade');

            setTimeout(function() {
                app.lettrView.bodyTag.classList.toggle('landing-page');
                app.lettrView.bodyTag.classList.remove('landing-page-fade');
            }, 100);
        },
        userWinsListener: function() {
            app.lettrController.UserWins(true);
        },
        addAlertButtonListener: function(doesUserWins) {
            if(doesUserWins) {
                app.lettrView.alertBoxButton.addEventListener('click', this.userWinsListener);
            } else {
                app.lettrView.alertBoxButton.addEventListener('click', app.lettrController.startNewGame);
            }
        },
        showUserMessage: function(message, alertType, showButton, disableTimeOut, buttonText) {
            
            clearTimeout(this.currentSetTimeout);

            this.alertBoxMessage.innerText = message;

            if(alertType) {
                this.alertBox.classList.add(alertType);
            } else {
                this.alertBox.classList.remove('guess-success');
            }

            if(app.lettrView.alertBox.classList.contains('hide')){
                this.toggleAlertBox();
                
            }

            if(!disableTimeOut) {
                this.currentSetTimeout = setTimeout(this.toggleAlertBox, 3000);
            }

            if(showButton) {
                this.toggleButtonView(buttonText);
            }
            
        },
        startOverlayToggle: function() {
            if(app.lettrView.bodyTag.classList.contains('landing-page')) {
                app.lettrView.startOverlay.classList.add('landing-page-fade');

                setTimeout(function() {
                    app.lettrView.startOverlay.classList.toggle('hide');
                    app.lettrView.mainContentContainer.classList.toggle('hide');
                    app.lettrView.startOverlay.classList.remove('landing-page-fade');
                }, 100);
            } else {
                app.lettrView.startOverlay.classList.toggle('hide');
                app.lettrView.mainContentContainer.classList.toggle('hide');
            }
        },
        showUserWordInputForm: function() {
            app.lettrView.startOverlay.classList.add('show-word-form');
            if(app.lettrView.startOverlay.classList.contains('hide')) {
                app.lettrView.startOverlayToggle();
            }
        },
        populateOverlaySelectedWord: function(word) {
            this.selectedUserWord.innerText = word;
            this.startOverlay.classList.add('word-selected');
        },
        startGameFromOverlay: function() {
            app.lettrView.render();
            app.lettrView.startOverlayToggle();
            app.lettrView.toggleLandingPage();
            setTimeout(function() {
                app.lettrView.startOverlay.classList.remove('word-selected');
                app.lettrView.startOverlay.classList.remove('show-word-form');
            }, 100);
        },
        addEventListeners: function() {
            this.userGuessForm.addEventListener('submit', app.lettrController.validateUserGuess);
            this.formLetterRadioOption.addEventListener('change', this.setGuessInputMaxLength);
            this.formWordRadioOption.addEventListener('change', this.setGuessInputMaxLength);
            this.startOverlayRandomButton.addEventListener('click', app.lettrController.presetInit);
            this.startOverlayChooseButton.addEventListener('click', app.lettrController.userInputInit);
            this.userWordForm.addEventListener('submit', app.lettrController.startUserInitializedGame);
            this.startGamebutton.addEventListener('click', this.startGameFromOverlay);
            this.endGameButton.addEventListener('click', app.lettrController.startNewGame);
        },
        getDomElements: function() {
            this.bodyTag = document.querySelector('[data-js="body-tag"]');
            this.guessedLettersContainer = document.querySelector('[data-js="guessed-letters"]');
            this.guessWordsContainer = document.querySelector('[data-js="guessed-words"]');
            this.availableGuessesContainer = document.querySelector('[data-js="available-guesses-container"]');
            this.wordContainter = document.querySelector('[data-js="word-container"]');
            this.userGuessInput = document.querySelector('[data-js="user-guess-input"]');
            this.userGuessSubmit = document.querySelector('[data-js="user-guess-submit"]');
            this.userGuessForm = document.querySelector('[data-js="user-guess-form"]');
            this.formLetterRadioOption = document.querySelector('#guess-letter');
            this.formWordRadioOption = document.querySelector('#guess-word');
            this.userScoreContainer = document.querySelector('[data-js="user-score"]');
            this.alertBox = document.querySelector('[data-js="alert-box"]');
            this.alertBoxIcon = document.querySelector('[data-js="alert-box-icon"]');
            this.alertBoxMessage = document.querySelector('[data-js="alert-box-message"]');
            this.alertBoxButton = document.querySelector('[data-js="alert-box-button"]');
            this.startOverlay = document.querySelector('[js-data="start-overlay"]');
            this.startOverlayRandomButton = document.querySelector('[js-data="start-overlay-random"]');
            this.startOverlayChooseButton = document.querySelector('[js-data="start-overlay-choose"]');
            this.userWordForm = document.querySelector('[data-js="user-word-form"]');
            this.userUniqueWordInput = document.querySelector('[data-js="user-unique-word"]');
            this.selectedUserWord = document.querySelector('[data-js="selected-user-word"]');
            this.startGamebutton = document.querySelector('[data-js="start-game-button"');
            this.mainContentContainer = document.querySelector('[js-data="main-content"]');
            this.endGameButton = document.querySelector('[data-js="end-game"]');
        },
        clearBoardView: function() {
            this.guessedLettersContainer.innerHTML = '';
            this.guessWordsContainer.innerHTML = '';
            this.formLetterRadioOption.checked = true;
            this.formWordRadioOption.checked = false;
            this.setGuessInputMaxLength();
        },
        render: function() {
            this.displayWord();
            this.populateAvailableGuesses();
        },
        init: function() {
            this.getDomElements();
            this.addEventListeners();
        }
    }

    window.app = window.app || {};
    window.app.lettrView = lettrView;
})(window);