if (typeof(animate)===typeof(Function)) {
    setInterval(animate, 32);
}
background('gray')

document.addEventListener('keydown', onKeyDown)

function onKeyDown(event) {
    console.log(mouse.x, mouse.y)
}

// function animate() {
//     new Rectangle(0,0,500,50, 'gray').draw()
//     new Text(40, 40, String(mouse.x) + " " + String(mouse.y), 'sansserif', 50).draw()
// }
    

// var c = new Circle();
// c.radius = 20;
// c.fill = 'green';
// function animate() {
//    // Draw a circle around the mouse when the button is pressed.
//    if (mouse.down) {
//       c.x = mouse.x;
//       c.y = mouse.y;
//       c.draw();
//    }
// }