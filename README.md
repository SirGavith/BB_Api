# BB_Api
 Re-creation of the BlackBird JS Api  
 Open an issue if you find a bug!

## Why use this?
 - BB_Api is free and open-source
 - The js is run by the browser like any other js
   - This means that this avoids all bugs that stem from Blackbird's custom interpreter
   - It also means that you can use completely regular js alongside the helpful built-ins that Blackbird provides
   - Since we sidestep the custom interpreter, it also means that using BB_Api is **SIGNIFICANTLY** more performant than on Blackbird. Some calculations that take several seconds on Blackbird can be executed nearly instantly!
  - You can use the console
  - You can still use the standard js debugger in the dev tools

## Usage
 - Paste your blackbird code in `main.js`
 - If you have multiple files, use `addJSFile(path)` in `main.js` to load each file. If you only have one file, don't worrk about this!
 - Locate the path to `main.html` and navigate there in a browser (I only tested on Firefox, please open an issue if you are having any)
### Images
 - Move all images to the `images` folder
 - Index all images as a list in `images.js`
   - It should look like this (with your image names, of course):  
`var images = [
    "icons.png",
    "logo.png",
    "tileset.png"
]`
 - You can then use those images exactly as you would in Blackbird
### Known issues
 - `prompt()` cancel option returns `null`, not `false` (idk how to fix)

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

## Credits
 - Sir_Gavith for the creation of this Api
 - Blackbird for making the original platform
 - SAT.js and all its contributors github.com/jriecken/sat-js