class ObjSqr {
    constructor(x = 50, y = 50, type = 'head',color = '#89cf61') {
        this.x = x;
        this.y = y;
        this.oldX = this.x;
        this.oldY = this.y - 50;
        this.type = type;
        this.color = color;
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
        this.oldCentre = {
            x: this.centre.x - 50,
            y: this.centre.x - 50
        }
    }
    update(x, y) {

        if (this.isSelTouch(x, y)) {
            this.oldX = this.x;
            this.oldY = this.y;
            this.x = x,
                this.y = y;
            this.centre = {
                x: this.x + 25,
                y: this.y + 25
            }
            this.oldCentre = {
                x: this.centre.x - 50,
                y: this.centre.x - 50
            }
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
            ]
        }
    }
    draw() {
        beginShape();
        fill(this.color)
        noStroke();
        this.setColor();
        this.points.map((e) => {
            vertex(e.x, e.y);
        })
        endShape(CLOSE);
    }
    showCentre(){
        fill('red')
        circle(this.centre.x,this.centre.y,10);
    }
    isSelTouch(x, y) {
        if (x == this.oldCentre.x && y == this.oldCentre.y) {
            return false
        } else {
            return true
        }
    }
    setColor() {
        switch (this.type) {
            case 'head':
                this.color = '#89cf61'
                break;
            case 'body':
                this.color = '#7ab359'
                break;
            case 'tail':
                this.color = '#67964b'
                break;
            default:
                break;
        }
    }
}