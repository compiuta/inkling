(function(window){
    'use-strict';

    let lettrView = {
        displayWord: function(word) {
            this.wordContainter.innerText = app.lettrController.wordFormatToDisplay();
        },
        createAvailableGuessElement: function(isUsed) {
            let isGuessAvailable = document.createElement('div');
            isGuessAvailable.classList.add('guess-availale');
            if(isUsed) {
                isGuessAvailable.classList.add('guess-used');
                isGuessAvailable.innerText = 'X';
            } else {
                isGuessAvailable.classList.add('guess-not-used');
                isGuessAvailable.innerText = 'O';
            }

            return isGuessAvailable;
        },
        populateAvailableGuesses: function() {
            let fragment = document.createDocumentFragment();
            let guessAvailableObject = app.lettrController.guessesAvailable();
            this.availableGuessesContainer.innerHTML = '';
            
            for(let i = 0; i < guessAvailableObject.guessUsed; i++) {
                let isGuessAvailable = this.createAvailableGuessElement('isUsed');
                fragment.appendChild(isGuessAvailable);
            }

            for(let i = 0; i < guessAvailableObject.guessAvailable; i++) {
                let isGuessAvailable = this.createAvailableGuessElement();
                fragment.appendChild(isGuessAvailable);
            }

            this.availableGuessesContainer.appendChild(fragment);
        },
        createSelectedLetterElement: function() {
            let guessedLetter = document.createElement('div');
            guessedLetter.classList.add('guessed-letter');
            return guessedLetter;
        },
        populateSelectedLetters: function(data) {
            this.guessedLettersContainer.innerHTML = '';

            let fragment =  document.createDocumentFragment();

            for(let i = 0; i < data.length; i++) {
                let guessedLetter = this.createSelectedLetterElement();
                guessedLetter.innerText = data[i];
                fragment.appendChild(guessedLetter);
            }
            
            this.guessedLettersContainer.appendChild(fragment);
        },
        addEventListeners: function() {
            this.userGuessForm.addEventListener('submit', app.lettrController.validateUserGuess);
        },
        getDomElements: function() {
            this.guessedLettersContainer = document.querySelector('[data-js="guessed-letters"]');
            this.availableGuessesContainer = document.querySelector('[data-js="available-guesses-container"]');
            this.wordContainter = document.querySelector('[data-js="word-container"]');
            this.userGuessInput = document.querySelector('[data-js="user-guess-input"]');
            this.userGuessSubmit = document.querySelector('[data-js="user-guess-submit"]');
            this.userGuessForm = document.querySelector('[data-js="user-guess-form"]');
        },
        render: function() {
            this.displayWord();
            this.populateAvailableGuesses();
        },
        init: function() {
            this.getDomElements();
            this.addEventListeners();
            this.render();
        }
    }

    window.app = window.app || {};
    window.app.lettrView = lettrView;
})(window);