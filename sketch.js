var canvas
let snake
let apple
function setup() {
  canvas = createCanvas(innerWidth, innerWidth,WEBGL);
  snake = new Snake(100, 100);
  apple = new Apple(300,300);
  apples.push(apple);   
  // Create a p5.Camera object.
  cam = createCamera();

  // Place the camera at the top-center.
  cam.setPosition(0, -150, 120);

  // Point the camera at (10, 20, -30).
  cam.lookAt(0, -150, 0);

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
let apples = []
let d3 = true;
function draw() {
if(d3 !== false){
  background('#141414');

  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 0, 0, -1);
  orbitControl()

  push();
  noStroke()
  fill('#1f1f1f')
  translate(0,-100,0)
  box(100,200,30);
  translate(0,50,30)
  box(100,100,30);
  translate(0,-160,-15)
  box(100,20,60);
  pop();

  push();
  fill('#73c769');
  emissiveMaterial(18, 30, 9);
  translate(0,-150,15)
  box(100,100,2);
  pop();
}

  push();
  scale(.2);
  translate(-250,-1000,81)
  apples.filter( apple => {
    if(apple.display === false){
        apples.pop();
        let newx = Math.floor(Math.random()*10)*50;
        let newy = Math.floor(Math.random()*10)*50;
        apples.push(new Apple(Math.floor(Math.random()*10)*50,Math.floor(Math.random()*10)*50,true))
    }
  })
  allObjects = snake.snake.concat(apples);
  collisions = collision(allObjects, snake.head.centre.x, snake.head.centre.y);
  allObjects.map(e =>{
    e.draw();
  })
  // drawPointsEnv();
  // drawEnvirov();
  pop();
}
function newApple(){
  let newx = Math.floor(Math.random()*10)*50;
  let newy = Math.floor(Math.random()*10)*50;
  if(collision(allObjects,newx,newy)){
    apples.push(new Apple(newx,newy,true));
  }
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
  draw()
  frameRate(60);
}
function collision(objList, x, y) {
  if (!Array.isArray(objList)) {
    console.error("Error: objList is not an array");
    return false; // O manejar el error de otra manera
  }

  const obj = objList;
  let aprove
  const result = obj.filter(obj => {
    return obj.centre.x === x && obj.centre.y === y && obj.type !== 'head';
  });
  if(result.length > 0){
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
  return false;
  }else{
    return true
  }
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