(function(window){
    'use-strict';

    let lettrView = {
        displayWord: function() {
            this.wordContainter.innerText = app.lettrController.wordFormatToDisplay();
        },
        setGuessInputMaxLength: function() {
            if(app.lettrView.formLetterRadioOption.checked) {
                app.lettrView.userGuessInput.setAttribute('maxlength', '1');
            } else {
                app.lettrView.userGuessInput.removeAttribute('maxlength');
            }
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
        addEventListeners: function() {
            this.userGuessForm.addEventListener('submit', app.lettrController.validateUserGuess);
            this.formLetterRadioOption.addEventListener('change', this.setGuessInputMaxLength);
            this.formWordRadioOption.addEventListener('change', this.setGuessInputMaxLength);
        },
        getDomElements: function() {
            this.guessedLettersContainer = document.querySelector('[data-js="guessed-letters"]');
            this.guessWordsContainer = document.querySelector('[data-js="guessed-words"]');
            this.availableGuessesContainer = document.querySelector('[data-js="available-guesses-container"]');
            this.wordContainter = document.querySelector('[data-js="word-container"]');
            this.userGuessInput = document.querySelector('[data-js="user-guess-input"]');
            this.userGuessSubmit = document.querySelector('[data-js="user-guess-submit"]');
            this.userGuessForm = document.querySelector('[data-js="user-guess-form"]');
            this.formLetterRadioOption = document.querySelector('#guess-letter');
            this.formWordRadioOption = document.querySelector('#guess-word');
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