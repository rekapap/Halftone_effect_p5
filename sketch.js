var img;

function setup() {
  createCanvas(512, 683);
  img = loadImage("assets/img.jpg");
}

function draw() {
  image(img, 0, 0);
  image(img, 0);
}
