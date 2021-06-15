
background('gray')

function onKeyDown(event) {
    console.log(mouse.x, mouse.y)
}

var x = new Sprite(300, 300, 'icons', 5, 2);
x.center = true;
x.rotation = 90;
x.scale = 1.25
x.draw(6)

new Image(500, 500, 'logo', 0, 3).draw()


function animate() {
    new Rectangle(0,0,500,50, 'gray').draw()
    new Text(40, 40, String(mouse.x) + " " + String(mouse.y), 'sans serif', 50).draw()
    new Circle(0, 0, 10).draw()
}
    

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