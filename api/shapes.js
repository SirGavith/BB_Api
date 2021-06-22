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
    getSAT() {
        throw new Error("Method 'getSAT()' must be implemented.")
    }
}

class Point extends Shape {
    constructor(x, y) {
        super(x, y)
    }
    draw() {
        new Circle(this.x, this.y, 3).draw()
    }
    getSAT() {
        return new SAT.Circle(new SAT.Vector(this.x, this.y), 5)
    }
}

class Text extends Shape {
    constructor(x, y, text, font = 'Ariel', fontSize = '15', fill = 'black', borderColor = 'black', borderWidth = 0) {
        super(x, y)
        this.text = text
        this.font = font.replace(' ', '-')
        this.fontSize = fontSize
        this.fill = fill
        this.borderColor = borderColor
        this.borderWidth = borderWidth
    }
    draw() {
        this.applyStyle()
        ctx.fillText(this.text, this.x, this.y)
        if (this.borderWidth > 0) {
            ctx.strokeText(this.text, this.x, this.y)
        }
    }
    applyStyle() {
        ctx.font = String(this.fontSize) + "px " + this.font
        ctx.fillStyle = Utils.parseColor(this.fill)
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = Utils.parseColor(this.borderColor)
    }
    getSAT() {
        let xy = this.getRenderPos()
        return new SAT.Box(new SAT.Vector(xy.x, xy.y),
            this.getRenderWidth(),
            this.getRenderHeight()
        ).toPolygon();
    }
    getRenderPos() {
        let xy = {}
        xy.x = this.x
        xy.y = this.y - this.getRenderHeight()
        return xy
    }
    getRenderWidth() {
        this.applyStyle()
        return ctx.measureText(this.text).width
    }
    getRenderHeight() {
        return this.fontSize * 2/3
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
    getSAT() {
        return new SAT.Polygon(new SAT.Vector, [
            new SAT.Vector(this.x1, this.y1),
            new SAT.Vector(this.x2, this.y2)
        ])
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
    getSAT() {
        const p = new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height)
            .toPolygon();
        if (this.rotation) {
            p.rotate(Utils.degRad(this.rotation))
        }
        return p
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
    getSAT() {
        return new SAT.Circle(new SAT.Vector(this.x, this.y), this.radius)
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
    getSAT() {
        return new SAT.Polygon(new SAT.Vector, [
            new SAT.Vector(this.x, this.y),
            new SAT.Vector(this.x2, this.y2),
            new SAT.Vector(this.x3, this.y3)
        ])
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
    getSAT() {
        let xy = this.getRenderPos()
        return new SAT.Box(new SAT.Vector(xy.x, xy.y),
            this.getRenderWidth(),
            this.getRenderHeight()
        ).toPolygon();
    }
    getRenderPos() {
        let xy = {}
        xy.x = this.x - this.halfWidth
        xy.y = this.y - this.halfHeight
        return xy
    }
    getRenderHeight() {
        return this.halfHeight * 2
    }
    getRenderWidth() {
        return this.halfWidth * 2
    }
}

class Image extends Shape {
    constructor(x, y, name, rotation = 0, scale = 1, center = false, width, height, framesPerRow = 1, framesPerColumn = 1) {
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
        this.framesPerRow = framesPerRow
        this.framesPerColumn = framesPerColumn
    }
    draw(sprite = 0) {

        let tileX = sprite % this.framesPerRow,
            tileY = Math.floor(sprite / this.framesPerRow)

        // console.log('tile', tileX, tileY)

        if (!Object.keys(imgs).includes(this.name)) {
            throw new Error('Unknown image ' + this.name)
        }
        const img = imgs[this.name]

        let sx = this.getNaturalWidth() * tileX, sy = this.getNaturalHeight() * tileY
        let offset = this.getCenterOffset()
        
        // console.log('drawing image', this, 'at', this.x, this.y, 'offset', offset)
        // console.log(img, sx, sy, this.getWidth(), this.getHeight(), offset.x, offset.y, this.getRenderWidth(), this.getRenderHeight())

        ctx.translate(this.x, this.y);
        ctx.rotate(Utils.degRad(this.rotation));
        ctx.drawImage(img, sx, sy, this.getNaturalWidth(), this.getNaturalHeight(), offset.x, offset.y, this.getRenderWidth(), this.getRenderHeight())
        ctx.rotate(-Utils.degRad(this.rotation));
        ctx.translate(-this.x, -this.y);
    }
    getSAT() {
        let xy = this.getRenderPos()
        const p = new SAT.Box(new SAT.Vector(xy.x, xy.y),
            this.getRenderWidth(),
            this.getRenderHeight()
        ).toPolygon();
        if (this.rotation) {
            p.rotate(Utils.degRad(this.rotation))
        }
        return p
    }
    getRenderPos() {
        let offset = this.getCenterOffset()
        return {x:this.x + offset.x, y: this.y + offset.y}
    }
    getCenterOffset() {
        let xy = {x:0, y:0}
        if (this.center) {
            xy.x -= this.getRenderWidth() / 2
            xy.y -= this.getRenderHeight() / 2
        }
        return xy
    }
    getNaturalWidth() {
        return imgs[this.name].naturalWidth / this.framesPerRow
    }
    getWidth() {
        let w = this.width
        if (!w) {
            w = imgs[this.name].naturalWidth / this.framesPerRow
        }
        return w
    }
    getRenderWidth() {
        return this.getWidth() * this.scale
    }
    getNaturalHeight() {
        return imgs[this.name].naturalHeight / this.framesPerColumn
    }
    getHeight() {
        let h = this.height
        if (!h) {
            h = imgs[this.name].naturalHeight / this.framesPerColumn
        }
        return h
    }
    getRenderHeight() {
       return this.getHeight() * this.scale
    }
}

class Sprite extends Image {
    constructor(x, y, name, framesPerRow, framesPerColumn, rotation = 0, scale = 1, center = false, width, height) {
        super(x, y, name, rotation, scale, center, width, height, framesPerRow, framesPerColumn)
    }
}

function text() {
    write(...arguments)
}

function rectangle() {
    new Rectangle(...arguments).draw()
}

function circle() {
    new Circle(...arguments).draw()
}

function triangle() {
    new Triangle(...arguments).draw()
}

function image() {
    new Image(...arguments).draw()
}