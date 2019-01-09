"use strict";

let originalImage;
var filteredImage;
let lpi = 5;

function preload(){
  originalImage = loadImage("assets/img.jpeg");
}

function setup() {
  createCanvas(originalImage.width * 2, originalImage.height);
  filteredImage = halftone(originalImage, lpi);
}

function draw() {
  image(originalImage, 0, 0);
  image(filteredImage, originalImage.width, 0);
}

function halftone(originalImage, lpi) {
  originalImage.loadPixels();

  let gridWidth = createGridWidth(originalImage, lpi);
  let gridHeight = createGridHeight(originalImage, lpi);

  // matrix
  let matrix = createMatrix(gridHeight, gridWidth, originalImage);

  // draw circles
  let filteredImage = createFilteredImage(originalImage, matrix);

  return filteredImage;
}

function createGridWidth(originalImage, lpi) {
  let gridWidth = Math.ceil(originalImage.width/lpi);
  return gridWidth;
}

function createGridHeight(originalImage, lpi) {
  let gridHeight = Math.ceil(originalImage.height/lpi);
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
  // calculate the pixel positions in this grid part
  let gridIntensity = 0;
  let pixels = 0;

  let imageWidth = originalImage.width;
  let imageHeight = originalImage.height;

  for (var i = 0; i < lpi ; i++) {
    let pixelPositionY = matrixY * lpi + i;
    if(pixelPositionY >= imageHeight) continue;

    for (var j = 0; j < lpi; j++) {
      let pixelPositionX = matrixX * lpi + j;
      if(pixelPositionX >= imageWidth) continue;

      // calculte pixel intensity
      let index = (pixelPositionY * imageWidth + pixelPositionX) * 4;
      gridIntensity += calculateIntesityForPixel(originalImage, index);
      pixels++;
    }
  }
  return gridIntensity/pixels;
}

function calculateIntesityForPixel(img,index){
  let red = img.pixels[index];
  let green = img.pixels[index + 1];
  let blue = img.pixels[index + 2];
  let alpha = img.pixels[index + 3];
  let pixelColor = color(red, green, blue, alpha);
  let pixelBrightness = brightness(pixelColor);
  return 1 - pixelBrightness/100;
}

function createFilteredImage(originalImage, matrix) {
  let filteredImage = createGraphics(originalImage.width, originalImage.height);
  filteredImage.background(255);
  filteredImage.noStroke();
  filteredImage.fill(0);

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      let centerY = i * lpi + lpi/2;
      let centerX = j * lpi + lpi/2;
      let radius = Math.hypot(lpi,lpi) * matrix[i][j];
      filteredImage.ellipse(centerX, centerY, radius, radius);
    }
  }
  return filteredImage;
}
