
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var waff;
var wafflesQt = [];
var waffleQt;
var confNonConfQt;
var data;
var dataQt;
function preload() {
	data = loadTable("data/product-defects/productData.csv", "csv", "header");
	dataQt = loadTable("data/product-defects/dataQt.csv", "csv", "header");
}

// columns for quarter data
confNonConfQt = ["Quarter_1", "Quarter_2", "Quarter_3", "Quarter_4"];



var gallery;
function setup() {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 576);
  c.parent('app');

  for( var i =0; i < confNonConfQt.length; i++) {
    if (i < 4) {
        wafflesQt.push( new WaffleQt(40 +(i * 220), dataQt, confNonConfQt[i]));
    }
}

  // Create a new gallery object.
  gallery = new Gallery();
  
  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
  gallery.addVisual(new Waffle());
  
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
  
}
