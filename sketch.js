var canvas
let snake
let apple
function setup() {
  canvas = createCanvas(500, 500);
  snake = new Snake(100, 100);
  apple = new Apple(300,300);
}
const sw = 50;
let points = [
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 500
  },
  {
    x: 500,
    y: 0
  },
  {
    x: 500,
    y: 500
  }
]
let x
let cuadricula = 10
let allObjects
let collisions;
let apples = [];
function draw() {
  background('#7bcc6e');
  if(apple.display)apples.push(apple);
  else apples = [];
  allObjects = snake.snake.concat(apples);
  collisions = collision(allObjects, snake.head.centre.x, snake.head.centre.y);
  
  // drawPointsEnv();
  // drawEnvirov();
  snake.draw(snake.x, snake.y);
  if (apple.display) {
    apple.draw();
  };
}

async function keyPressed(e) {
  collision(allObjects, snake.head.centre.x, snake.head.centre.y);
  if(snake.going){
    switch (key) {
      case 's':
        snake.update(snake.x, snake.y + 50);
        break;
      case 'w':
        snake.update(snake.x, snake.y - 50);
        break;
      case 'd':
        snake.update(snake.x + 50, snake.y);
        break;
      case 'a':
        snake.update(snake.x - 50, snake.y);
        break;
  
      default:
        break;
    }
  }
  
  frameRate(60);
}
function collision(objList, x, y) {
  if (!Array.isArray(objList)) {
    console.error("Error: objList is not an array");
    return false; // O manejar el error de otra manera
  }

  const obj = objList;
  
  const result = obj.filter(obj => {
    return obj.centre.x === x && obj.centre.y === y && obj.type !== 'head';
  });
  result.map(e =>{
      switch (e.type) {
        case 'apple':
          e.gotAte();
          break;
          case 'body':
            e.color = 'red';
            snake.going = false;
            break;
            case 'tail':
              e.color = 'red';
              snake.going = false;
              break;
      
        default:
          break;
      }
  })
}

function drawEnvirov() {
  for (x = 0; x < cuadricula; x++) {
    stroke('black')
    line(0, -localLerp(points[0].y, points[1].y, x / cuadricula), 500, -localLerp(points[0].y, points[1].y, x / cuadricula));
    stroke('black')
    line(-localLerp(points[0].x, points[3].x, x / cuadricula), 0, -localLerp(points[0].x, points[3].x, x / cuadricula), 500);
  }
}
function drawPointsEnv() {
  points.map(e => {
    fill('red')
    circle(e.x, e.y, 10);
  })
}