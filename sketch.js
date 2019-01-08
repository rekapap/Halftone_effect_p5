"use strict";

let originalImage;
var filteredImage;
let lpi = 45;

function preload(){
  originalImage = loadImage("assets/img.jpg");
}

function setup() {
  createCanvas(1024, 683);
  //filteredImage = halftone(originalImage, lpi);
}

function draw() {
  image(originalImage, 0, 0);
  image(filteredImage, 512, 0);
}

function halftone(originalImage, lpi) {

  let gridWidth = createGridWidth(originalImage, lpi);
  let gridHeight = createGridHeight(originalImage, lpi);

  // matrix
  let matrix = createMatrix(gridHeight, gridWidth, originalImage);

  // draw circles
  let filteredImage = createFilteredImage(originalImage, matrix);

  return filteredImage;
}

function createGridWidth(originalImage, lpi) {
  let gridWidth = 1 + (originalImage.width - 1) / lpi;
  return gridWidth;
}

function createGridHeight(originalImage, lpi) {
  let gridHeight = 1 + (originalImage.height - 1) / lpi;
  return gridHeight;
}

function createMatrix(gridHeight, gridWidth, originalImage) {
  var matrix = new Array(gridHeight);
  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(gridWidth);
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      let intensity = calculateIntesityForGrid(originalImage, i, j, lpi);
      matrix[i][j] = intensity;
    }
  }
  return matrix;
}

// calculate the intesity of the average of this grid part
function calculateIntesityForGrid(originalImage, matrixY, matrixX, lpi) {
  // calculate the pixel in this grid part

  // let pixelPositionX;
  // let pixelPositionY;
  // var index = (x + y * originalImage.width) * 4;
  // calculateIntesityForPixel(originalImage, index);
  // return ;
}

function calculateIntesityForPixel(img,index){
  let red = img.pixels[index];
  let green = img.pixels[index + 1];
  let blue = img.pixels[index + 2];
  let color = color(red, green, blue)
  let brightness = brightness(color);

  return 1 - brightness/255;
}

function createFilteredImage(originalImage, matrix) {
  let filteredImage = createGraphics(originalImage.width, originalImage.height);
  filteredImage.background(255);
  filteredImage.noStroke();

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      let centerY = i * lpi + lpi/2;
      let centerX = j * lpi + lpi/2;
      let radius = Math.hypot(lpi/2,lpi/2) * matrix[i][j];
      filteredImage.ellipse(centerX, centerY, radius, radius);
    }
  }
  return filteredImage;
}
