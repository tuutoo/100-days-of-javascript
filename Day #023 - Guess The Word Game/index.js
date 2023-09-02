const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

// Initializing game variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses;

// Select random word form word list and set up game
function startNewGame() {
  // Choose random word from db and setup game
  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word

  maxGuesses = word.length >= 5 ? 8 : 6
  incorrectLetters = []
  correctLetters = []
  hintTag.innerText = ranWord.hint
  guessLeft.innerText = maxGuesses
  mistakes.innerText = incorrectLetters

  // Create input for each letter in the word
  inputs.innerHTML = ''
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement('input')
    input.type = 'text'
    input.disabled = true
    inputs.appendChild(input)
  }
}

// Handle user input and update game stats
function handleUserInputs(e) {
  // Ignore non-letters input and letters that have already guessed
  const key = e.target.value.toLowerCase()
  if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(key) && !correctLetters.includes(key)) {
    // Check if the letter is in word
    if (word.includes(key)) {
      // Update correct guess
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll('input')[i].value += key
        }
      }
      correctLetters += key;
    } else {
      // Update incorrect guess
      maxGuesses--
      incorrectLetters.push(key)
      mistakes.innerText = incorrectLetters
    }
  }

  // Update remain guess and check for win lose conditions
  guessLeft.innerText = maxGuesses
  if (correctLetters.length === word.length) {
    alert(`Congrates! You Found The Word ${word.toUpperCase()}`)
    // startNewGame()
  } else if (maxGuesses < 1) {
    alert("Game Over! You Don't Have Remaining Guesses!")
    for (let i = 0; i < word.length; i++) {
      // Fill inputs with correct words
      inputs.querySelectorAll('input')[i].value = word[i]
    }
  }

  // Clear input field
  typeInput.value = ''
}

// Setup event listers
resetBtn.addEventListener('click', startNewGame)
typeInput.addEventListener('input', handleUserInputs)
inputs.addEventListener('click', () => typeInput.focus())
document.addEventListener('keydown', () => typeInput.focus())

startNewGame()