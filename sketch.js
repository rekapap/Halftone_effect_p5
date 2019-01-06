let myImage;

function preload(){
  myImage = loadImage("assets/img.jpg");
}

function setup() {
  createCanvas(512, 683);
  image(myImage, 0, 0);
  filter(GRAY);
}
