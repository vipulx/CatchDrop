const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let basket = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  width: 80,
  height: 20,
  dx: 5
};

let items = [];
let score = 0;
let gameInterval;

function createItem() {
  const item = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    dy: 2
  };
  items.push(item);
}

function drawBasket() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawItems() {
  ctx.fillStyle = "#f00";
  items.forEach(item => {
    ctx.fillRect(item.x, item.y, item.width, item.height);
  });
}

function moveItems() {
  items.forEach((item, index) => {
    item.y += item.dy;
    
    // Check for catching
    if (item.y + item.height >= basket.y && item.x + item.width >= basket.x && item.x <= basket.x + basket.width) {
      items.splice(index, 1);
      score++;
    }

    // Remove items that fall off screen
    if (item.y > canvas.height) {
      items.splice(index, 1);
    }
  });
}

function moveBasket() {
  if (rightPressed && basket.x < canvas.width - basket.width) {
    basket.x += basket.dx;
  }
  if (leftPressed && basket.x > 0) {
    basket.x -= basket.dx;
  }
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  }
  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawItems();
  moveItems();
  moveBasket();
  drawScore();
}

function startGame() {
  gameInterval = setInterval(() => {
    update();
    if (Math.random() < 0.05) {
      createItem();
    }
  }, 1000 / 60);
}

startGame();
