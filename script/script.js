//                        SNAKE                     //

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = canvas.width
let height = canvas.height

let blockSize = 10;
let widthInBlocks = width / blockSize
let heightInBlocks = width / blockSize

let score = 0

let drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize)
    ctx.fillRect(0, height - blockSize, width, blockSize)
    ctx.fillRect(0, 0, blockSize, height)
    ctx.fillRect(width - blockSize, 0, blockSize, height)
}

let drawScore = function () {
    ctx.font = " 20px Courier"
    ctx.fillStyle = "White"
    ctx.textBaseline = "top"
    ctx.fillText("Score: " + score, blockSize, blockSize)
}

let gameOver = function () {
    clearInterval(intervalId)
    ctx.font = "40px Courier"
    ctx.fillStyle = "Red"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Game Over", width / 2, height / 2)
}

let Block = function (col, row) {
    this.col = col
    this.row = row
}

Block.prototype.drawSquare = function (color) {
    let x = this.col * blockSize
    let y = this.row * blockSize
    ctx.fillStyle = color
    ctx.fillRect(x, y, blockSize, blockSize)
}

let circle = function (x, y, r, fillCircle) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    if (fillCircle) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}

Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2
    let centerY = this.row * blockSize + blockSize / 2
    ctx.fillStyle = color
    circle(centerX, centerY, blockSize / 2, true)
}

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row
}

let Snake = function () {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ]
    this.direction = "right"
    this.nextDirection = "right"
}

Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Red")
    }
}

Snake.prototype.move = function () {
    let head = this.segments[0]
    let newHead

    this.direction = this.nextDirection

    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row)
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1)
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row)
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1)
    }

    if (this.checkCollision(newHead)) {
        gameOver()
        setTimeout(function () {location.reload()}, 3000)
        return
    }

    this.segments.unshift(newHead)

    if (newHead.equal(apple.position)) {
        score++
        apple.move()
    } else {
        this.segments.pop()
    }
}

Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col === 0)
    let topCollision = (head.row === 0)
    let rightCollision = (head.col === widthInBlocks - 1)
    let bottomCollision = (head.row === heightInBlocks - 1)

    let wallCillision = leftCollision || topCollision ||
        rightCollision || bottomCollision

    let selfCollision = false

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true
        }
    }
    return wallCillision || selfCollision
}

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return
    } else if (this.direction === "right" && newDirection === "left") {
        return
    } else if (this.direction === "down" && newDirection === "up") {
        return
    } else if (this.direction === "left" && newDirection === "right") {
        return
    }

    this.nextDirection = newDirection
}

let Apple = function () {
    this.position = new Block(10, 10)
}

Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen")
}

Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2) + 1)
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2) + 1)
    this.position = new Block(randomCol, randomRow)
}

let apple = new Apple()
let snake = new Snake()

let play = () => {
    snake.move()
    snake.draw()
    apple.draw()
}
let scoreBtn = 0;

let btn = $("#btn__play").on('click', () => {
    if (btn) {
        scoreBtn++
    }
})

let intervalId = setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    drawScore()
    if (scoreBtn === 1) {
        play()
        $('#btn__play').detach()
    }
    drawBorder()
}, 100)


let = directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
}

$("body").keydown(function (e) {
    let newDirection = directions[e.keyCode]
    if (newDirection !== undefined) {
        snake.setDirection(newDirection)
    }
});


