class Snake {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.going = true;
        this.fuerza = 0;
        this.limitX = canvas.width;
        this.limitY = canvas.height - 10;
        this.head = new ObjSqr(this.x, this.y);
        this.body = new ObjSqr(this.x, this.y - 50, 'body');
        this.tail = new ObjSqr(this.x, this.y - 100, 'tail');
        this.snake = [this.head, this.body, this.tail];
        this.d = { p: 1, }
    }
    eat() {
        console.log('pop',this.snake.pop());
        const lastSegment = this.snake[this.snake.length - 1];
        const newSegment = new ObjSqr(lastSegment.oldX, lastSegment.oldY, 'body');
        console.log('snake  ',this.snake);
        this.snake.push(newSegment);
        
        this.tail.x = lastSegment.oldCentre.x;
        this.tail.y = lastSegment.oldCentre.y;
        this.snake.push(this.tail);
    }
    update(x = this.x, y = this.y) {
        if (x >= 0 && y >= 0 && x <= 450 && y <= 450) {
            if (this.going) {
                for (let z = 0; z < this.snake.length; z++) {
                    if (z != 0) {
                        this.snake[z].update(this.snake[z - 1].oldX, this.snake[z - 1].oldY);
                    } else {
                        this.snake[z].update(x, y);
                    }

                }
                this.x = x;
                this.y = y;
            }
        }
    }
    draw(x, y) {
        this.snake.map(e => {
            e.draw();
        })
    }
    movement(d) {
        switch (d) {
            case 1:

                break;
            case -1:

                break;

            default:
                break;
        }
    }
}