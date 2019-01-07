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

  let gridWidth = 1 + (originalImage.width - 1) / lpi;
  let gridHeight = 1 + (originalImage.height - 1) / lpi;

  // matrix
  var matrix = new Array(gridHeight);
  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(gridWidth);
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      let intensity = calculateIntesity(originalImage, i, j, lpi);
      matrix[i][j] = intensity;
    }
  }

  // draw circles
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

// calculate the intesity of the average of this grid part
function calculateIntesity(originalImage, matrixY, matrixX, lpi) {
  // calculate the pixel in this grid part
}