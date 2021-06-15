const canvas = document.getElementById('canvas')
const body = document.getElementsByTagName('body')[0]
var ctx = canvas.getContext('2d')
var imgs = {}

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

document.addEventListener('keydown', function() {onKeyDown()})


function loadImage(img) {
    return new Promise(resolve => {
        imgs[img] = document.createElement("img")
        imgs[img].src = 'images/' + img
        imgs[img].onload = () => resolve()
    })
}

async function loadImages() {
    console.log('loading images')
    let imgPromises = []
    for (let i = 0; i < images.length; i++) {
        imgPromises.push(loadImage(images[i]))
    }
    await Promise.all(imgPromises)
}

loadImages().then(() => loadMain())

function loadMain() {
    const script = document.createElement("script")
    script.src = 'main.js'
    console.log("running main.js")
    body.appendChild(script)
    setTimeout(function () {
        const api2 = document.createElement("script")
        api2.src = 'api2.js'
        body.appendChild(api2)
    }, 0);
}

function afterMain() {
    console.log('after main.js')
    if (typeof (animate) === typeof (Function)) {
        setInterval(animate, 32);
    }
}

var PI = Math.PI

var mouse = {
    x: -1,
    y: -1
}

function onMouseMove(event) {
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

    static drawShapeHelper(fill, borderColor, borderWidth) {
        ctx.fillStyle = Utils.parseColor(fill)
        if (!borderWidth) {
            borderColor = 'rgba(0,0,0,0)'
        }
        ctx.strokeStyle = Utils.parseColor(borderColor)
        ctx.lineWidth = borderWidth;
    }
}

function background(color = 'white') {
    ctx.fillStyle = Utils.parseColor(color)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}