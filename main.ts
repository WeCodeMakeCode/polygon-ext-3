 
//% weight=100 color=#C71585 blockGap=8
//% groups='["Create", "Properties"]'
namespace polygon {
    //% block="create polygon with %n_sides sides radius %radius || color %color angle %angle"
    //% blockSetVariable=myPolygon
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% n_sides.min=3 n_sides.max=30 n_sides.defl=3
    //% radius.min=10 adius.max=50 radius.defl=30
    //% color.min=1 color.max=15 color.defl=2  
    //% angle.min=0 angle.max=360 angle.defl=0
    //% group="Create"
    //% weight=100
    export function createPolygon(n_sides: number, radius: number, color: number = 2, angle: number = 0): Polygon {
        return new Polygon(n_sides, radius, color, angle);
    }
    //% block="destroy %polygon=variables_get(myPolygon)"
    //% group="Create"
    //% weight=99
    export function destroyPolygon(polygon:Polygon){
        polygon.sprite.destroy();
        polygon = null;
    }
}
//% blockNamespace=polygon color="#008080" blockGap=8blockGap=8
class Polygon {
    private _polygon: Sprite = null;
    private _img: Image = null;
    private _sides: number = 3;
    private _radius: number = 30;
    private _spokes: boolean = false;
    private _color: number = 2;
    private _angle: number = 0;
    private _types: string[] = ["", "", "", "triangle 3", "square 4", "pentagon 5", "hexagon 6", "heptagon 7", "Octagon 8", "Nonagon 9", "Decagon 10", "Hendecagon 11", "Dodecagon 12", "Triskaidecagon 13", "Tetrakaidecagon 14", "Pentadecagon 15", "Hexakaidecagon 16", "Heptadecagon 17", "Octakaidecagon 18", "Enneadecagon 19","Icosagon 20"];
    //% group="Properties"
    //% lockSetVariable="myPolygon"
    //% blockCombine block="sides"
    get sides(): number {
        return this._sides;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="sides"
    set sides(value: number) {
        this._sides = Math.min(Math.max(value, 3), 30);
        this.draw_polygon();
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="radius"
    get radius(): number {
        return this._radius;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="radius"
    set radius(value: number) {
        this._radius = value;
        this._polygon.destroy();
        this._img = image.create(2 * this._radius + 1, 2 * this._radius + 1)
        this._polygon = sprites.create(this._img, SpriteKind.Player)
        this.draw_polygon();
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="spokes"
    get spokes(): boolean {
        return this._spokes;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="spokes"
    set spokes(value: boolean) {
        this._spokes = value;
    }
    //% group="Properties"
    //%  blockSetVariable="myPolygon"
    //% blockCombine block="color"
    get color(): number {
        return this._color;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="color"
    set color(value: number) {
        this._color = Math.min(Math.max(value, 1), 15);
        this.draw_polygon();
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="starting angle degrees"
    get angle(): number {
        return this._angle;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="starting angle degrees"
    set angle(value: number) {
        if (value > 0){
            this._angle = value % 360;   
        } else {
            this._angle = value + 360;          
        }
        this.draw_polygon();
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="sprite"
    get sprite(): Sprite {
        return this._polygon;
    }
    //% group="Properties"
    //% blockSetVariable="myPolygon"
    //% blockCombine block="type"
    get type(): string {
        if (this._sides < this._types.length) { return this._types[this._sides];}
        else {return this._sides.toString()}
    }
    constructor(sides: number, radius: number, color: number, starting_angle_degrees: number) {
        this._sides = sides;
        this._radius = radius;
        this._color = color;
        this._angle = starting_angle_degrees;
        this._img = image.create(2 * this._radius + 1, 2 * this._radius + 1)
        this._polygon = sprites.create(this._img, SpriteKind.Player)
        this.draw_polygon();
    }
    private draw_polygon() {
        this._img.fill(0);
        let step_degrees = 360 / this._sides;
        let angle_degrees = this._angle;
        while (angle_degrees < this._angle + 360) {
            let x1 = this.degrees_to_X(angle_degrees, this._radius, this._radius);
            let y1 = this.degrees_to_Y(angle_degrees, this._radius, this._radius);
            let x2 = this.degrees_to_X(angle_degrees + step_degrees, this._radius, this._radius);
            let y2 = this.degrees_to_Y(angle_degrees + step_degrees, this._radius, this._radius);
            this._img.drawLine(x1, y1, x2, y2, this._color);
            if (this._spokes){
                this._img.drawLine(this._radius, this._radius,x1,y1,this._color);
            }
            angle_degrees += step_degrees;
        }
    }
    private degrees_to_X(angle_degrees: number, radius: number, origin_X: number): number {
        let angle_radians = angle_degrees * Math.PI / 180
        return origin_X + radius * Math.cos(angle_radians)
    }
    private degrees_to_Y(angle_degrees: number, radius: number, origin_Y: number): number {
        let angle_radians = angle_degrees * Math.PI / 180
        return origin_Y + radius * Math.sin(- angle_radians)
    }
}
enum Direction {
    //% block="clockwise"
    Clockwise = 0,
    //% block="counterclockwise"
    Counterclockwise = 1,
    //% block="Random"
    Random = 2,
    //% block="Reverse"
    Reverse = 3,
}
//%  weight=100 color=#FF4500 blockGap=8
//% groups='["Create", "Properties"]'
namespace spinner {
    //% block="create spinner from %polygon=variables_get(myPolygon) with speed %speed || rotate %direction"
    //% blockSetVariable=mySpinner
    //% speed.min=-10 speed.max=10 speed.defl=0
    //% group="Create"
    //%  weight=100 
    export function createSpinner(polygon: Polygon, speed: number,direction:Direction = Direction.Clockwise):Spinner {
        return new Spinner(polygon,speed,direction);
    };
    //% block="destroy %spinner=variables_get(mySpinner)"
    //% group="Create"
    //%  weight=99
    export function destroySpinner(spinner: Spinner) {
        spinner.polygon.sprite.destroy();
        spinner = null;
    }
    export class Spinner {
        private _polygon: Polygon = null;
        private _speed: number = 0;
        private _direction:Direction = Direction.Clockwise;
        //% blockSetVariable="mySpinner"
        //% blockCombine block="polygon"
        //% group="Properties"
        get polygon(): Polygon {
            return this._polygon;
        }
        //% group="Properties"
        //% blockSetVariable="mySpinner"
        //% blockCombine block="speed"
        get speed(): number {
            return this._speed;
        }
        //% group="Properties"
        //% blockSetVariable="mySpinner"
        //% blockCombine block="speed"
        set speed(value: number) {
            this._speed = value;
        }
        //% group="Properties"
        //% blockSetVariable="mySpinner"
        //% blockCombine block="direction"
        get direction(): Direction {
            return this._direction;
        }
        //% group="Properties"
        //% blockSetVariable="mySpinner"
        //% blockCombine block="direction"
        set direction(value: Direction) {
            if (value == Direction.Reverse) {
                if (this._direction == Direction.Clockwise){
                    this._direction = Direction.Counterclockwise;
                } else {
                    this._direction = Direction.Clockwise;
                }
            } else if (value == Direction.Random) {
                    this.pickDirection();
            } else {
                this._direction = value;
            }
        }
        private pickDirection(){
            if (Math.randomRange(0, 1) == 0) {
                this._direction = Direction.Clockwise;
            } else {
                this._direction = Direction.Counterclockwise;
            }
        }
        constructor(polygon: Polygon, speed: number = 5, direction:Direction=Direction.Clockwise) {
            this._polygon = polygon;
            this._speed = speed;
            this._direction = direction; 
            if (this._direction == Direction.Random) {
                this.pickDirection();
            }
            game.onUpdate(function () {
                if (this._direction == Direction.Clockwise) {
                    this._polygon.angle = this._polygon.angle - this._speed;
                } else {
                    this._polygon.angle = this._polygon.angle + this._speed;
                }
            })
        }
    }
}

