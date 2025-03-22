class Apple {
    constructor(x = 0, y = 0, display = true) {
        this.x = x;
        this.y = y;
        this.display = display;
        this.value = 1;
        this.type = 'apple';
        this.points = [
            {
                x: this.x,
                y: this.y
            },
            {
                x: this.x + 50,
                y: this.y
            },
            {
                x: this.x + 50,
                y: this.y + 50
            },
            {
                x: this.x,
                y: this.y + 50
            },
        ];
        this.centre = {
            x: this.x + 25,
            y: this.y + 25
        }
    }
    gotAte() {
           if(this.display){
            this.display = false;
            console.log('snake', snake.snake);
            
            snake.eat();
           }
            
    }
    draw() {
        beginShape();
        fill('#b84848')
        this.points.map((e) => {
            vertex(e.x, e.y);
        })
        endShape(CLOSE);
    }
    showCentre(){
        fill('white')
        circle(this.centre.x, this.centre.y, 10);
    }
}