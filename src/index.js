class Point {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        Point.checkValue(_x);
        Point.checkValue(_y);
    }
    static checkValue(value) {
        if (value < Point.minValue || value > Point.maxValue) {
            throw `wrong value ${value}, should be in range[${Point.minValue} - ${Point.maxValue}]`;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        Point.checkValue(value);
        this._x = value;
    }
    set y(value) {
        Point.checkValue(value);
        this._y = value;
    }
    draw() {
        console.log(`Point [x: ${this._x}, y: ${this._y}]`);
    }
}
Point.minValue = -100;
Point.maxValue = 100;
class Line extends Point {
    constructor(x, y, _point) {
        super(x, y);
        this._point = _point;
    }
    draw() {
        console.log('-------------Line-----------------');
        super.draw();
        this._point.draw();
        console.log('-'.repeat(20));
    }
    get point() {
        return this._point;
    }
}
class Square extends Point {
    constructor(x, y, _width) {
        super(x, y);
        this._width = _width;
    }
    get width() {
        return this._width;
    }
    draw() {
        console.log('-----------Square---------');
        super.draw();
        console.log(`width: ${this._width}`);
        console.log('-'.repeat(20));
    }
}
class Rectangle extends Square {
    constructor(x, y, width, _height) {
        super(x, y, width);
        this._height = _height;
    }
    draw() {
        console.log('++++++++++Rectangle++++++++++++');
        super.draw();
        console.log(`height: ${this._height}`);
        console.log('='.repeat(20));
    }
}
class Canvas {
    constructor() {
        this._shapes = [];
    }
    draw() {
        this._shapes.forEach(e => console.log(e));
    }
    addShape(shape) {
        this._shapes.push(shape);
        const index = this._shapes.indexOf(shape);
        return index;
    }
    removeShape(index) {
        const res = this._shapes[index];
        if (res) {
            this._shapes.splice(index, 1);
        }
        return res;
    }
    sort() {
        this._shapes.sort((a, b) => {
            if (a instanceof Point && b instanceof Point) {
                return a.x - b.x ? a.x - b.x : b.y - a.y;
            }
            else {
                return 0;
            }
        });
    }
    removeIf(predicate) {
        return this._shapes.filter(predicate);
    }
}
const shape = new Square(3, 4, 10);
// if(shape instanceof Square){
//     console.log(shape.width);
// }
// const point: Point = new Point(10, 10);
// point.draw();
// point.x = 200;
// point.draw();
// const shapes: Shape[] = [
//     new Line(3,4,new Point(10, 10)),
//     new Square(2,5,10),
//     new Line(20, 30, new Point(3, 4)),
//     new Rectangle(10, 15, 20, 5)
// ]
// shapes.forEach(s => s.draw())
console.log('==================TEST=======================');
let canvas = new Canvas();
console.log('-----------------addShape--------------------');
canvas.addShape(new Line(3, 4, new Point(10, 10)));
canvas.addShape(new Square(2, 5, 10));
canvas.addShape(new Line(20, 30, new Point(3, 4)));
canvas.addShape(new Rectangle(10, 15, 20, 5));
canvas.addShape(new Line(5, 2, new Point(2, 5)));
canvas.draw();
console.log('---------------removeShape-----------------');
canvas.removeShape(4);
canvas.draw();
canvas.addShape(new Line(5, 2, new Point(2, 5)));
canvas.addShape(new Line(5, 3, new Point(2, 5)));
console.log('-----------------sort----------------------');
canvas.sort();
canvas.draw();
console.log('----------------removeIf-------------------');
canvas.removeIf(shape => shape instanceof Line && shape.x > shape.point.x);
canvas.draw();
