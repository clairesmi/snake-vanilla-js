document.addEventListener('DOMContentLoaded', () => {

  // Lose variables
  // dom vaiables

  const reset = document.querySelector('.reset')
  const gameOver = document.querySelector('.game-over')
  const title = document.querySelector('.title')

  // variables for hi-score 
  const hiScores = document.querySelector('.hi-scores')
  const scoreArray = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : []
  const data = JSON.parse(localStorage.getItem('scores'))
  let top3 = []

  console.log(scoreArray)
  console.log(data)
  console.log(top3)

  //  *** global variables ***

  // game variables
  let speed = 200
  let timerId = null
  let direction = null
  let points = 0

  // *** build the grid ***
  const width = 20
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const cells = []

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  gameOver.classList.add('hide')

  // *** build the snake and add it randomly to the grid ***
  const x = Math.floor(Math.random() * cells.length)
  // console.log(x)
  const snakeArr = [x, x - 1]
  // console.log(snakeArr)

  // *** add classes to snake array ***
  function addSnake() {
    snakeArr.map(index => cells[index].classList.add('snake'))
    cells[snakeArr[0]].classList.add('head')
  }
  addSnake() // call add snake function



  // *** remove the snake from the grid
  function removeSnake () {
    snakeArr.map(index => cells[index].classList.remove('snake'))
    cells[snakeArr[0]].classList.remove('head')
  }

  // console.log(cells)

  // *** Snake moves ***

  function snakeMove() {

    if (direction === 'right') {
      removeSnake()
      snakeArr.pop()
      if (snakeArr[0] % width === 19) {
        snakeArr[0] -= 19
      }
      snakeArr.unshift(snakeArr[0] + 1)
      addSnake()
    }

    if (direction === 'left') {
      removeSnake()
      snakeArr.pop()
      if (snakeArr[0] % width === 0) {
        snakeArr[0] += 19
      }
      snakeArr.unshift(snakeArr[0] - 1)
      addSnake()
    }

    if (direction === 'up') {
      removeSnake()
      snakeArr.pop()
      if (snakeArr[0] <= 19) {
        snakeArr[0] += 380
      }
      snakeArr.unshift(snakeArr[0] - width)
      addSnake()
    }

    if (direction === 'down') {
      removeSnake()
      snakeArr.pop()
      if (snakeArr[0] >= 380) {
        snakeArr[0] -= 380
      }
      snakeArr.unshift(snakeArr[0] + width)
      addSnake()
    }

    snakeEats() // call snake eats so the game can run this function whilst the snake is moving around
    // the grid
    snakeDies() // as above - checking to see if the snakeDies conditions are true 
    // timerId = setTimeout(snakeMove, speed)
  }

  timerId = setInterval(snakeMove, speed)

  // *** User directs the snake ***
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37: if (direction !== 'right') direction = 'left' //moveLeft()
        break
      case 38: if (direction !== 'down') direction = 'up'
        break
      case 39: if (direction !== 'left') direction = 'right'
        break  
      case 40: if (direction !== 'up') direction = 'down'
        break    
    }
  })

  snakeMove() 

  // *** randomly add food ***
  function feed() {
    const foodIdx = Math.floor(Math.random() * cells.length)
    if (!cells[foodIdx].classList.contains('snake')) {
      cells[foodIdx].classList.add('food')
    } else {
      feed()
    }
    
  }

  // *** snake eats food ***
  function snakeEats() {
    if (cells[snakeArr[0]].classList.contains('food')) {
      cells[snakeArr[0]].classList.remove('food')
      snakeArr.unshift(snakeArr[0])
      feed()
      speed -= 10
      points += 1
      console.log(points)
      score.innerHTML = (`score: ${points}`)
    }    
  }
  feed()

  function snakeDies() {
    if (snakeArr.slice(2).includes(snakeArr[0])) {
      storeScores()
      snakeGameOver()
    }
  }

  function snakeGameOver() {
    grid.classList.replace('grid', 'hide', 'reset')
    gameOver.classList.remove('hide')
    title.classList.add('hide')
    hiScores.classList.add('hide')
    resetGame()
  }

  function resetGame() {
    reset.addEventListener('click', () => {
      location.reload()
    })
  }
  resetGame()

  // functions for creating and storing high scores
  
  function hiScoreCreate(points) {
    const hiScore = document.createElement('div')
    hiScore.classList.add('hi-score')
    hiScore.innerHTML = points
    hiScores.appendChild(hiScore)
  }

  function storeScores() {
    scoreArray.push(points)
    localStorage.setItem('scores', JSON.stringify(scoreArray))
    console.log(scoreArray)
    hiScoreCreate()
  }

  data ? top3 = data.sort((a, b) => b - a).slice(0, 3) : null
  top3.map(score => hiScoreCreate(score))
  console.log(top3)



})


// tim's code
// snakeArray.map(index => squares[index].classList.add('snake'))
// function move(e) {
//   if (e.keyCode === 39 && playerIndex % width < width - 1) {
//     clear()
//   }
//   snakeRight = setInterval(moveRight, 200)
//   console.log('move right')

//   if (e.keyCode === 37 && playerIndex % width > 0) {
//     clear()
//   }
//   snakeLeft = setInterval(moveLeft, 200)
//   console.log('move left')

//   if (e.keyCode === 40 && playerIndex + width < width * width) {
//     clear()
//   }
//   snakeDown = setInterval(moveDown, 200)
//   console.log('move down')
//   if (e.keyCode === 38 && playerIndex - width >= 0) {
//     clear()
//   }
//   snakeUp = setInterval(moveUp, 200)
//   console.log('move up')

// }