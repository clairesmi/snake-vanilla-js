document.addEventListener('DOMContentLoaded', () => {

  // Lose conditions

  const reset = document.querySelector('.reset')
  const gameOver = document.querySelector('.game-over')
  const title = document.querySelector('.title')

  //  *** global variables ***
  let speed = 300
  let timer = null
  let direction
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

  // *** build the snake ***
  const snakeArr = [22, 21]

  // *** add the snake to the grid ***
  function addSnake() {
    snakeArr.map(index => cells[index].classList.add('snake'))
    cells[snakeArr[0]].classList.add('head')

    const body = snakeArr.filter(index => !cells[index].classList.contains('head'))
    body.map(index => cells[index].classList.add('body'))
  }
  addSnake()

  // *** remove the snake from the grid
  function removeSnake () {
    snakeArr.map(index => cells[index].classList.remove('snake'))
    cells[snakeArr[0]].classList.remove('head')

    const body = snakeArr.filter(index => !cells[index].classList.contains('head'))
    body.map(index => cells[index].classList.remove('body'))
  }

  console.log(cells)


  // *** Snake moves ***
  function snakeMove() {
    timer = setTimeout(snakeMove, speed)
    if (direction === 'right') {
      moveRight()
    }
    if (direction === 'left') {
      moveLeft()
    }
    if (direction === 'up') {
      moveUp()
    }
    if (direction === 'down') {
      moveDown()
    }
    snakeEats() // call snake eats so the game can run this function whilst the snake is moving around
    // the grid
    snakeDies() // as above - checking to see if the snakeDies conditions are true 
  }

  // *** Automatic snake movement *** 
  function moveRight() {
    removeSnake()
    snakeArr.pop()
    if (snakeArr[0] % width === 19) {
      snakeArr[0] -= 19
    }
    snakeArr.unshift(snakeArr[0] + 1)
    addSnake()
  }

  function moveUp() {
    removeSnake()
    snakeArr.pop()
    if (snakeArr[0] <= 19) {
      snakeArr[0] += 380
    }
    snakeArr.unshift(snakeArr[0] - width)
    addSnake()
  }

  function moveLeft() {
    removeSnake()
    snakeArr.pop()
    if (snakeArr[0] % width === 0) {
      snakeArr[0] += 19
    }
    snakeArr.unshift(snakeArr[0] - 1)
    addSnake()
  }

  function moveDown() {
    removeSnake()
    snakeArr.pop()
    if (snakeArr[0] >= 380) {
      snakeArr[0] -= 380
    }
    snakeArr.unshift(snakeArr[0] + width)
    addSnake()
  }


  // *** User directs the snake ***
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37: if (direction !== 'right') direction = 'left'
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
  function feed () {
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
      console.log('game over')
      snakeGameOver()
    }
  }

  function snakeGameOver() {
    grid.classList.replace('grid', 'hide', 'reset')
    gameOver.classList.remove('hide')
    title.classList.add('hide')
    resetGame()
  }

  function resetGame() {
    reset.addEventListener('click', () => {
      location.reload()
    })
  }
  resetGame()
  

})