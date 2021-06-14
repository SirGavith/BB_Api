var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
// canvas.addEventListener('mousedown', function (e) {
//     if (e.button != 2) {
//         click(e)
//     }
// })
//canvas.addEventListener('contextmenu', click)
ctx.imageSmoothingEnabled = false
canvas.addEventListener("mousemove", onMouseMove);


var mouse = {
    x: -1,
    y: -1
}

function onMouseMove (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
}

class Utils {
    constructor() {
        throw new Error("Static classes can't be instantiated.")
    }

    static parseColor(color) {
        if (typeof (color) == "object") {
            return String("rgb(" + color.red + "," + color.green + "," + color.blue + ")")
        } else {
            return color
        }
    }

    static degRad(deg) {
        return deg * Math.PI / 180
    }

    static rotatePoint(x, y, cx, cy, angle) {
        let sin = Math.sin(angle), cos = Math.cos(angle)
        let out = {}
        x -= cx
        y -= cy
        out.x = x * cos - y * sin
        out.y = x * sin + y * cos
        out.x += cx
        out.y += cy
        return out
    }
}

function background(color = 'white') {
    ctx.fillStyle = Utils.parseColor(color)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Shape {
    constructor(x, y) {
        if (this.constructor == Shape) {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.x = x
        this.y = y
    }
    draw() {
        throw new Error("Method 'draw()' must be implemented.")
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height, fill = 'black', borderColor = 'black', borderWidth = 0, rotation = 0, cornerRadius = 0) {
        super(x, y)
        this.width = width
        this.height = height
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
        this.rotation = rotation
        this.cornerRadius = cornerRadius
    }
    draw() {
        let x = this.x, y = this.y, width = this.width, height = this.height
        let radius = this.cornerRadius

        let angle = Utils.degRad(this.rotation)

        ctx.lineJoin = 'round'
        ctx.lineWidth = this.borderWidth;
        ctx.fillStyle = Utils.parseColor(this.fill)
        ctx.strokeStyle = Utils.parseColor(this.borderColor)

        function moveToRotated(lx, ly) {
            let xy = Utils.rotatePoint(lx, ly)
            ctx.moveTo(xy.x, xy.y)
        }

        function lineToRotated(lx, ly) {
            let xy = Utils.rotatePoint(lx, ly, x, y, angle)
            ctx.lineTo(xy.x, xy.y)
        }

        function quadraticCurveRotated(cpx, cpy, px, py) {
            let xy1 = Utils.rotatePoint(cpx, cpy, x, y, angle)
            let xy2 = Utils.rotatePoint(px, py, x, y, angle)
            ctx.quadraticCurveTo(xy1.x, xy1.y, xy2.x, xy2.y)
        }

        ctx.beginPath()
        moveToRotated(x + radius, y)
        lineToRotated(x + width - radius, y)
        quadraticCurveRotated(x + width, y, x + width, y + radius)
        lineToRotated(x + width, y + height - radius)
        quadraticCurveRotated(x + width, y + height, x + width - radius, y + height)
        lineToRotated(x + radius, y + height)
        quadraticCurveRotated(x, y + height, x, y + height - radius)
        lineToRotated(x, y + radius)
        quadraticCurveRotated(x, y, x + radius, y)
        ctx.closePath()
        ctx.fill()
        if (this.borderWidth > 0) {
            ctx.stroke();
        }
    }
}

class Text extends Shape {
    constructor(x, y, text, font, fontSize, fill = 'black', borderColor = 'black', borderWidth = 0) {
        super(x, y)
        this.text = text
        this.font = font
        this.fontSize = fontSize
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        ctx.font = String(this.fontSize) + "px "+ this.font
        ctx.lineWidth = this.borderWidth;
        ctx.fillStyle = Utils.parseColor(this.fill)
        ctx.strokeStyle = Utils.parseColor(this.borderColor)
        ctx.fillText(this.text, this.x, this.y)
        if (this.borderWidth > 0) {
            ctx.fillText(this.text, this.x, this.y)
        }
    }
}