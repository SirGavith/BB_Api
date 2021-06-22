# BB_Api
 Re-creation of the BlackBird JS Api

## Usage
 - Paste your blackbird code in `main.js`
 - If you have multiple files, use `addJSFile(path)` in `main.js` to load each file. If you only have one file, don't worrk about this!
 - Locate the path to `main.html` and navigate there in a browser (I only tested on Firefox, please open an issue if you are having any)
### Images
 - Move all images to the `images` folder
 - Index all images as a list in `images.js`
   - It should look like this:  
`var images = [
    "icons.png",
    "logo.png",
    "tileset.png"
]`
 - You can then use those images exactly as you would in Blackbird

## Spec

### Shapes
 - Point ✔️
 - Text ✔️
 - Line ✔️
 - Rectangle ✔️
 - Circle ✔️
 - Triangle ✔️
 - Oval ✔️
 - Image ✔️
 - Sprite ✔️

### Methods
 - background ✔️
 - write ✔️
 - text ✔️
 - alert ✔️
 - confirm ✔️
 - prompt ✔️
 - stop ✔️
 - collide ✔️
 - abs ✔️
 - ceil ✔️
 - cos ✔️
 - exp ✔️
 - floor ✔️
 - max ✔️
 - min ✔️
 - pow ✔️
 - Number ✔️
 - random ✔️
 - round ✔️
 - sin ✔️
 - sqrt ✔️
 - tan ✔️
 - isInteger ✔️
 - toExponential ✔️
 - toFixed ✔️
 - toPrecision ✔️
 - toString ✔️
 - charAt ✔️
 - charCodeAt ✔️
 - concat ✔️
 - endsWith ✔️
 - fromCharCode ✔️
 - includes ✔️
 - indexOf ✔️
 - lastIndexOf ✔️
 - repeat ✔️
 - replace ✔️
 - slice ✔️
 - split ✔️
 - substr ✔️
 - substring ✔️
 - toLowerCase ✔️
 - toUpperCase ✔️
 - trim ✔️
 - rectangle ✔️
 - circle ✔️
 - triangle ✔️
 - image ✔️

### Events & Properties
 - mouse: y, z, down ✔️
 - keyboard: key, keyCode ✔️
 - onClick ✔️
 - onMouseDown ✔️
 - onMouseUp ✔️
 - onKeyDown ✔️
 - onKeyUp ✔️
