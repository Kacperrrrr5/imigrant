let streetNames = ["1 Maja", "3 Maja", "11 Listopada", "Adama Mickiewicza", "Jana Pawła II", "Aleja Niepodległości", "Andersa", "Bolesława Prusa"];
let currentAddress = "";
let mapImage;
let headImage;
let mapMask;
let buttonNext, buttonBack;
let buttonWidth = 100;
let buttonHeight = 50;

function preload() {
  // Load the map image
  mapImage = loadImage('map.png');
  headImage = loadImage('PASEK2.png');
}

function setup() {
  createCanvas(1920, 1080);
  fullscreen(true);
  textSize(20);

  // Create a graphics buffer for the mask
  mapMask = createGraphics(mapImage.width, mapImage.height);
  mapMask.image(mapImage, 0, 0);

  // Initialize buttons
  buttonNext = new Button(width - buttonWidth - 20, height - buttonHeight - 20, buttonWidth, buttonHeight, "Dalej");
  buttonBack = new Button(width - buttonWidth * 2 - 40, height - buttonHeight - 20, buttonWidth, buttonHeight, "Cofnij");
}

function draw() {
  background(220);
  image(headImage, 0, 0, 1920, 220);
  
  // Calculate center positions
  let mapX = (width - mapImage.width) / 2;
  let mapY = (height - mapImage.height) / 2;
  
  // Draw the map image at the center
  image(mapImage, mapX, mapY);
  
  fill(0);
  textStyle(BOLDITALIC);
  text("Wskaż na mapie dokładny adres zameldowania", 700, 300);
  noFill();
  strokeWeight(2);
  rect(715, 800, 500, 40);

  // Display the current address if it exists
  if (currentAddress !== "") {
    fill(0);
    textStyle(NORMAL);
    text(currentAddress, width / 2 - textWidth(currentAddress) / 2, 825);
  }

  // Draw buttons
  buttonNext.draw();
  buttonBack.draw();
}

function mousePressed() {
  // Calculate center positions
  let mapX = (width - mapImage.width) / 2;
  let mapY = (height - mapImage.height) / 2;
  
  // Check if the mouse is within the map bounds
  if (mouseX >= mapX && mouseX < mapX + mapImage.width && mouseY >= mapY && mouseY < mapY + mapImage.height) {
    // Get the pixel color at the mouse position relative to the map
    let c = mapMask.get(mouseX - mapX, mouseY - mapY);

    if (alpha(c) > 0) {
      let street = random(streetNames);
      let number = floor(random(1, 121));

      // Generating the first part of the postal code (01 to 09)
      let firstPart = nf(floor(random(1, 10)), 2);

      // Generating the second part of the postal code (001 to 999)
      let secondPart = nf(floor(random(1, 1000)), 3);

      let postalCode = firstPart + "-" + secondPart;

      currentAddress = street + " " + number + ", " + postalCode;
    }
  }

  // Check if buttons are pressed
  if (buttonNext.isMouseOver()) {
    window.open('https://www.wp.pl', '_self');
  }

  if (buttonBack.isMouseOver()) {
    console.log("Cofnij button pressed");
    // Add logic for "Cofnij" button press
  }
}

// Button class
class Button {
  constructor(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.hovered = false;
  }

  draw() {
    this.hovered = this.isMouseOver();
    fill(this.hovered ? 150 : 255);
    rect(this.x, this.y, this.width, this.height, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }

  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }
}
