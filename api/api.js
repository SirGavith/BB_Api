const canvas = document.getElementById('canvas')
const body = document.getElementsByTagName('body')[0]
var ctx = canvas.getContext('2d')
var imgs = {}
var animateIntervalId
var currentWriteLine = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.imageSmoothingEnabled = false

var PI = Math.PI

var mouse = {
    x: 100,
    y: 100,
    down: false
}

var keyboard = {
    key: null,
    keyCode: null
}

class Loader {
    constructor() {
        throw new Error("Static classes can't be instantiated.")
    }

    static loadImage(img) {
        return new Promise(resolve => {
            imgs[img] = document.createElement("img")
            imgs[img].src = 'images/' + img
            imgs[img].onload = () => resolve()
        })
    }

    static async loadImages() {
        console.log('Loading images...')
        let imgPromises = []
        for (let i = 0; i < images.length; i++) {
            imgPromises.push(Loader.loadImage(images[i]))
        }
        await Promise.all(imgPromises)
    }

    static loadMain() {
        const script = document.createElement("script")
        script.src = 'main.js'
        console.log("Running main.js")
        body.appendChild(script)
        setTimeout(function () {
            const api2 = document.createElement("script")
            api2.src = 'api/api2.js'
            body.appendChild(api2)
        }, 5);
        canvas.addEventListener('mousemove', Events.mouseMove);
        canvas.addEventListener('mousedown', Events.mouseDown)
        canvas.addEventListener('mouseup', Events.mouseUp)
        canvas.addEventListener('click', Events.click)
        
        document.addEventListener('keydown', Events.keyDown)
        document.addEventListener('keyup', Events.keyUp)
        
    }

    static afterMain() {
        if (typeof (animate) === typeof (Function)) {
            animateIntervalId = setInterval(animate, 30);
        }
    } 
}

class Events {
    constructor() {
        if (this.constructor == Events) {
            throw new Error("Static classes can't be instantiated.")
        }
    }

    static mouseMove(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }

    static mouseDown(event) {
        event.preventDefault() //middle click
        mouse.down = true
        if (typeof (onMouseDown) === typeof (Function)) {
            onMouseDown(new CustomMoveEvent(event))
        }
    }

    static mouseUp(event) {
        mouse.down = false
        if (typeof (onMouseUp) === typeof (Function)) {
            onMouseUp(new CustomMoveEvent(event))
        }
        if (event.button != 0) {
            Events.click(event)
        }
    }

    static click(event) {
        if (typeof (onClick) === typeof (Function)) {
            onClick(new CustomMoveEvent(event))
        }
    }
    
    static keyDown(e) {
        keyboard.key = e.key
        keyboard.keyCode = e.keyCode
        if (typeof (onKeyDown) === typeof (Function)) {
            onKeyDown(e)
        }
    }

    static keyUp(e) {
        keyboard.key = null
        keyboard.keyCode = null
        if (typeof (onKeyUp) === typeof (Function)) {
            onKeyUp(e)
        }
    }
}

class CustomMoveEvent extends Events {
    constructor(e) {
        super()
        this.x = e.clientX
        this.y = e.clientY
        this.button = Utils.parseMouseButton(e.button)
    }
}

Loader.loadImages().then(() => Loader.loadMain())
window.onresize = function () { canvas.height = window.innerHeight, canvas.width = window.innerWidth}

class Utils {
    constructor() {
        throw new Error("Static classes can't be instantiated.")
    }

    static parseColor(color) {
        if (typeof (color) == "object") {
            if (color.opacity) {
                return String("rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.opacity + ")")
            }
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

    static drawShapeHelper(fill, borderColor, borderWidth) {
        ctx.fillStyle = Utils.parseColor(fill)
        if (!borderWidth) {
            borderColor = 'rgba(0,0,0,0)'
        }
        ctx.strokeStyle = Utils.parseColor(borderColor)
        ctx.lineWidth = borderWidth;
    }

    static parseMouseButton(button) {
        switch (button) {
            case 0:
                button = 'Left'
                break
            case 1:
                button = 'Middle'
                break
            case 2:
                button = 'Right'
                break
        }
        return button
    }
}

function background(color = 'white') {
    ctx.fillStyle = Utils.parseColor(color)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function write(x, y, text, options = {}) {
    if (typeof(x) === typeof('str')) {
        text = x
        const lineHeight = 20,
            colWidth = canvas.width / 3,
            maxLines = Math.floor(canvas.height / lineHeight) - 1,
            currentCol = Math.floor(currentWriteLine / maxLines)
        x = colWidth * currentCol
        y = (currentWriteLine - maxLines * currentCol) * lineHeight + lineHeight
    }
    new Text(x, y, text, options.font, options.fontSize, options.fill, options.borderColor, options.borderWidth).draw()
    currentWriteLine++
}

function stop() {
    if (animateIntervalId) {
        clearInterval(animateIntervalId)
    } else {
        throw new Error('animate is not defined so you cannot use stop()')
    }
}

function collide(s1, s2) {
    let p1 = s1.getSAT(),
        p2 = s2.getSAT()
    console.log(p1, p2)

    if (p1 instanceof SAT.Polygon && p2 instanceof SAT.Polygon) {
        return SAT.testPolygonPolygon(p1, p2, new SAT.Response)
    } else if (p1 instanceof SAT.Circle && p2 instanceof SAT.Circle) {
        return SAT.testCircleCircle(p1, p2, new SAT.Response)
    } else if (p1 instanceof SAT.Polygon && p2 instanceof SAT.Circle) {
        return SAT.testPolygonCircle(p1, p2, new SAT.Response)
    } else if (p1 instanceof SAT.Circle && p2 instanceof SAT.Polygon) {
        return SAT.testPolygonCircle(p2, p1, new SAT.Response)
    }
}

function abs(n) {
    return Math.abs(n)
}

function ceil(n) {
    return Math.ceil(n)
}

function cos(n) {
    return Math.cos(n)
}

function exp(n) {
    return Math.exp(n)
}

function floor(n) {
    return Math.floor(n)
}

function max() {
    let maximum = 0
    let foundNumber = false
    for (const n in arguments) {
        if (Object.hasOwnProperty.call(arguments, n)) {
            const element = arguments[n]
            if (typeof(element) == typeof(1)) {
                foundNumber = true
            } else {
                continue
            }
            if (element > maximum) {
                maximum = element
            }
        }
    }
    if (!foundNumber) {
        maximum = NaN
    }
    return maximum
}

function min() {
    let minimum = Number.MAX_VALUE
    let foundNumber = false
    for (const n in arguments) {
        if (Object.hasOwnProperty.call(arguments, n)) {
            const element = arguments[n]
            if (typeof(element) == typeof(1)) {
                foundNumber = true
            } else { continue }
            if (element < minimum) {
                minimum = element
            }
        }
    }
    if (!foundNumber) {
        minimum = NaN
    }
    return minimum
}

function pow(b, e) {
    return Math.pow(b, e)
}

function random(min, max) {
    return Math.random() * (max - min) + min
}

function round(n) {
    return Math.round(n)
}

function sin(n) {
    return Math.sin(n)
}

function sqrt(n) {
    return Math.sqrt(n)
}

function tan(n) {
    return Math.tan(n)
}

function isInteger(n) {
    return Number.isInteger(n)
}

function fromCharCode(s) {
    return String.fromCharCode(s)
}

function addJSFile(path) {
    const file = document.createElement("script")
    file.src = path
    body.appendChild(file)
}