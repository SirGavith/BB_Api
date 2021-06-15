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

class Point extends Shape {
    constructor(x, y) {
        super(x, y)
    }
    draw() {
        new Circle(this.x, this.y, 3).draw()
    }
}

class Text extends Shape {
    constructor(x, y, text, font, fontSize, fill = 'black', borderColor = 'black', borderWidth = 0) {
        super(x, y)
        this.text = text
        this.font = font.replace(' ', '-')
        this.fontSize = fontSize
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        ctx.font = String(this.fontSize) + "px " + this.font
        ctx.fillStyle = Utils.parseColor(this.fill)
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = Utils.parseColor(this.borderColor)
        ctx.fillText(this.text, this.x, this.y)
        if (this.borderWidth > 0) {
            ctx.strokeText(this.text, this.x, this.y)
        }
    }
}

class Line extends Shape {
    constructor(x1, y1, x2, y2, borderColor = 'black', borderWidth = 1) {
        super(x1, y1)
        this.x2 = x2
        this.y2 = y2
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        Utils.drawShapeHelper('red', this.borderColor, this.borderWidth)
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
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
        Utils.drawShapeHelper(this.fill, this.borderColor, this.borderWidth)

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

class Circle extends Shape {
    constructor(x, y, radius, fill = 'black', borderColor = 'black', borderWidth = 0) {
        super(x, y)
        this.radius = radius
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        Utils.drawShapeHelper(this.fill, this.borderColor, this.borderWidth)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}

class Triangle extends Shape {
    constructor(x1, y1, x2, y2, x3, y3, fill = 'black', borderColor = 'black', borderWidth = 0) {
        super(x1, y1)
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        Utils.drawShapeHelper(this.fill, this.borderColor, this.borderWidth)
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x2, this.y2)
        ctx.lineTo(this.x3, this.y3)
        ctx.lineTo(this.x, this.y)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
}

class Oval extends Shape {
    constructor(x, y, halfWidth, halfHeight, fill = 'black', borderColor = 'black', borderWidth = 0, rotation = 0) {
        super(x, y)
        this.halfWidth = halfWidth
        this.halfHeight = halfHeight
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
        this.rotation = rotation
    }
    draw() {
        Utils.drawShapeHelper(this.fill, this.borderColor, this.borderWidth)
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.halfWidth, this.halfHeight, this.rotation, 0, Math.PI * 2);
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
}

class Image extends Shape {
    constructor(x, y, name, rotation = 0, scale = 1, center = false, width, height) {
        super(x, y)
        if (!name.includes('.')) {
            name += ".png"
        }
        this.name = name
        this.rotation = rotation
        this.scale = scale
        this.center = center
        this.width = width
        this.height = height
    }
    draw(tileX = 0, tileY = 0, framesPerRow = 1, framesPerColumn = 1) {
        if (!Object.keys(imgs).includes(this.name)) {
            throw new Error('Unknown image ' + this.name)
        }
        const img = imgs[this.name]

        let dWidth = this.width, dHeight = this.height

        if (!dWidth) {
            dWidth = img.naturalWidth / framesPerRow
        }
        if (!dHeight) {
            dHeight = img.naturalHeight / framesPerColumn
        }

        let sx = dWidth * tileX, sy = dHeight * tileY
        
        let rotation = this.rotation, scale = this.scale
        let dx = 0, dy = 0
        if (this.center) {
            dx -= dWidth / 2 * this.scale
            dy -= dHeight / 2 * this.scale
        }
        console.log('drawing image', this.name, 'at', this.x, this.y)
        
        ctx.translate(this.x, this.y);
        ctx.rotate(Utils.degRad(rotation));
        ctx.drawImage(img, sx, sy, dWidth, dHeight, dx, dy, dWidth * scale, dHeight * scale)
        ctx.rotate(-Utils.degRad(rotation));
        ctx.translate(-this.x, -this.y);
        
    }
}

class Sprite extends Image {
    constructor(x, y, name, framesPerRow, framesPerColumn, rotation = 0, scale = 1, center = false, width, height) {
        super(x, y, name, rotation, scale, center, width, height)
        this.framesPerRow = framesPerRow
        this.framesPerColumn = framesPerColumn
    }
    draw(sprite) {
        let sheetX = sprite % this.framesPerRow,
            sheetY = Math.floor(sprite / this.framesPerRow)
        new Image(this.x, this.y, this.name, this.rotation, this.scale, this.center, this.width, this.height)
            .draw(sheetX, sheetY, this.framesPerRow, this.framesPerColumn)
    }
}