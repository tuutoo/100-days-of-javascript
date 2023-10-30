document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const size = 4
  let board = []
  let currentScore = 0
  const currentScoreElem = document.getElementById('current-score')

  // Get the high score from local storage or set it to 0 if not found
  let highScore = localStorage.getItem('2048-highScore') || 0
  const highScoreElem = document.getElementById('high-score')
  highScoreElem.textContent = highScore;

  const gameOverElem = document.getElementById('game-over')

  // Function to update the score
  function updateScore(value) {
    currentScore += value
    currentScoreElem.textContent = currentScore

    // Check if the current score is higher than the high score
    if (currentScore > highScore) {
      highScore = currentScore
      highScoreElem.textContent = highScore
      localStorage.setItem('2048-highScore', highScore)
    }
  }

  // function to restart the game
  function restartGame() {
    currentScore = 0
    currentScoreElem.textContent = '0'
    gameOverElem.style.display = 'none'
    initializeGame()
  }

  // function to initialize the game
  function initializeGame() {
    board = [...Array(size)].map(e => Array(size).fill(0))
    placeRandom()
    placeRandom()
    renderBoard()
  }

  // function to render the game board on the UI
  function renderBoard() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`)
        const prevValue = cell.dataset.value
        const currentValue = board[i][j]
        if (currentValue !== 0) {
          cell.dataset.value = currentValue
          cell.textContent = currentValue

          // Animation handling
          if (currentValue !== parseInt(prevValue) && !cell.classList.contains('new-tile')) {
            cell.classList.add('merged-tile')
          }
        } else {
          cell.textContent = ''
          delete cell.dataset.value
          cell.classList.remove('merged-tile', 'new-tile')
        }
      }
    }

    // cleanup animation classes
    setTimeout(() => {
      const cells = document.querySelectorAll('.grid-cell')
      cells.forEach(cell => {
        cell.classList.remove('merged-tile', 'new-tile')
      })
    }, 300);
  }

  // function to place a random tile on the board
  function placeRandom() {
    const available = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          available.push({ x: i, y: j })
        }
      }
    }

    if (available.length > 0) {
      const randomCell = available[Math.floor(Math.random() * available.length)]
      board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4
      const cell = document.querySelector(`[data-row="${randomCell.x}"][data-col="${randomCell.y}"]`)
      cell.classList.add('new-tile') // Animation for new tiles
    }
  }

  // function to move the tiles based on arrow key input
  function move(direction) {
    let hasChanged = false
    if (direction === 'ArrowUp' || direction === 'ArrowDown') {
      for (let j = 0; j < size; j++) {
        const column = [...Array(size)].map((_, i) => board[i][j])
        const newColumn = transform(column, direction === 'ArrowUp')
        for (let i = 0; i < size; i++) {
          if (board[i][j] !== newColumn[i]) {
            hasChanged = true
            board[i][j] = newColumn[i]
          }
        }
      }
    } else if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
      for (let i = 0; i < size; i++) {
        const row = board[i]
        const newRow = transform(row, direction === 'ArrowLeft')
        if (row.join(',') !== newRow.join(',')) {
          hasChanged = true
          board[i] = newRow
        }
      }
    }
    if (hasChanged) {
      placeRandom()
      renderBoard()
      checkGameOver()
    }
  }

  // function to transform a line (row or column) based on move direction
  function transform(line, moveTowardsStart) {
    let newLine = line.filter(cell => cell !== 0)
    if (!moveTowardsStart) {
      newLine = newLine.reverse()
    }
    for (let i = 0; i < newLine.length - 1; i++) {
      if (newLine[i] === newLine[i + 1]) {
        newLine[i] *= 2
        updateScore(newLine[i]) // update score when tiles merged
        newLine.splice(i + 1, 1)
      }
    }
    while (newLine.length < size) {
      newLine.push(0)
    }
    if (!moveTowardsStart) {
      newLine.reverse()
    }
    return newLine
  }

  // function to check if the game is over
  function checkGameOver() {
    let gameOver = true
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          return // There is an empty cell, so game not over
        }
        if (i < size - 1 && board[i][j] === board[i + 1][j]) {
          return  // There are vertically adjacent equal cells, so a move is possible
        }
        if (j < size - 1 && board[i][j] === board[i][j + 1]) {
          return  // There are horizontally adjacent equal cells, so a move is possible
        }
      }
    }

    // if we reach here, no moves are possible
    gameOverElem.style.display = 'flex'
  }

  // initializeGame
  initializeGame()

  // event listeners
  document.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      move(e.key)
    }
    document.getElementById('restart-btn').addEventListener('click', restartGame)
  })

})