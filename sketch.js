let streetNames = ["1 Maja", "3 Maja", "11 Listopada", "Adama Mickiewicza", "Jana Pawła II", "Aleja Niepodległości", "Andersa", "Bolesława Prusa", "Bolesława Śmiałego", "Czarnieckiego", "Długa", "Dworcowa", "Franciszkańska", "Generała Władysława Sikorskiego", "Gimnazjalna", "Grodzka", "Henryka Sienkiewicza", "Hrubieszowska", "Ignacego Paderewskiego", "Jagiellońska", "Jana III Sobieskiego", "Józefa Piłsudskiego", "Juliusza Słowackiego", "Kalinowa", "Kamienna", "Karola Wojtyły", "Kasprowicza", "Kopernika", "Kościuszki", "Ks. Józefa Tischnera", "Kwiatowa", "Leśna", "Lwowska", "Matejki", "Mickiewicza", "Mikołaja Kopernika", "Moniuszki", "Narutowicza", "Nowa", "Okrzei", "Orzeszkowej", "Ostatnia", "Ostrołęcka", "Parkowa", "Partyzantów", "Podchorążych","Piaskowa", "Piotra Skargi", "Podgórna", "Polna", "Pomorska", "Powstańców Śląskich", "Prusa", "Pułaskiego", "Ratuszowa", "Reja", "Armii Krajowej", "Białostocka", "Chopina", "Cieszyńska", "Dąbrowskiego", "Gdańska", "Grunwaldzka", "Katowicka", "Kościelna", "Krakowska", "Królewska", "Legionów", "Lubelska", "Łokietka", "Marszałkowska", "Mazowiecka", "Nowowiejska", "Ogrodowa", "Powstańców Warszawskich", "Reymonta", "Rzeszowska", "Sandomierska", "Sienkiewicza", "Słowackiego", "Sobieskiego", "Szkolna", "Szczecińska", "Traugutta", "Warszawska", "Wrocławska", "Wyszyńskiego", "Zakopiańska", "Śląska", "Świętokrzyska", "Żeromskiego", "Żwirki i Wigury", "Żytnia", "Bolesława Chrobrego", "Częstochowska", "Daszyńskiego", "Fabryczna", "Górna", "Harcerska", "Iwaszkiewicza", "Jabłonowskich", "Kamienny Potok", "Kasprzaka", "Księcia Witolda", "Kwiatowa", "Lipowa", "Mazurska", "Mikołaja Reja", "Nadrzeczna", "Opolska", "Piastowska", "Pocztowa", "Północna", "Promienna", "Racławicka", "Różyckiego", "Rynek", "Słoneczna", "Stawowa", "Strzelecka", "Szeroka", "Świętojańska", "Toruńska", "Tuwima", "Wesoła", "Wiejska", "Wodna", "Wojska Polskiego", "Wolności", "Wróblewskiego", "Wschodnia", "Zielona"];
let currentAddress = "";
let mapImage;
let mapMask;

function preload() {
  // Load the map image
  mapImage = loadImage('map.png');
}

function setup() {
  createCanvas(1440, 600);
  textSize(20);

  // Create a graphics buffer for the mask
  mapMask = createGraphics(mapImage.width, mapImage.height);
  mapMask.image(mapImage, 0, 0);
}

function draw() {
  background(220);
  

  // Draw the map image
  image(mapImage, 20, 20);
  fill(0);
  textStyle(BOLDITALIC);
  text("Wskaż na mapie dokładny adres zameldowania",20, height-85);
  noFill();
  strokeWeight(2);
  rect(20, height-70, 500, 40);

  // Display the current address if it exists
  if (currentAddress !== "") {
    fill(0);
    textStyle(NORMAL);
    text(currentAddress, 34, height - 43);
  }
}

function mousePressed() {
  // Check if the mouse is within the map bounds
  if (mouseX >= 0 && mouseX < mapImage.width && mouseY >= 0 && mouseY < mapImage.height) {
    // Get the pixel color at the mouse position
    let c = mapMask.get(mouseX, mouseY);

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
}
