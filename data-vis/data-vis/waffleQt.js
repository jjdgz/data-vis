function WaffleQt (x, table, columnHeading) {
    this.preload = function() {
        // this.data = loadTable("data/product-defects/productData.csv", "csv", "header");
        this.dataQt = loadTable("data/product-defects/dataQt.csv", "csv", "header");
    }
    var x = x;
    var y = 320;
    var height = 200;
    var width = 200;
    var boxes_down = 10;
    var boxes_across = 10;
    var confNonConfQt = ["Quarter_1", "Quarter_2", "Quarter_3", "Quarter_4"];
    var column = table.getColumn(columnHeading);
    
    var valuesQt = ['good', 'type 1', 'type 2', 'type 3','type 4', 'type 5'];
    var possibleValues = valuesQt;

    var colors = ["red", "green", "blue", "purple",
                    "yellow", "orange"];

    function categoryLocation (categoryName) {
        for (var i = 0; i < categories.length; i ++) {
                if( categoryName == categories[i].name)  {
                        return i;
                }
        }
        return -1;
    }
    var categories = [];
    var boxes = [];
    
    function addCategories () {
        for (var i = 0; i < possibleValues.length; i++) {
            categories.push({
                    "name"  : possibleValues[i],
                    "count" : 0,
                    "color" : colors[i % colors.length]
            })
        }
        for ( var i = 0; i < column.length; i ++) {
            var catLocation =categoryLocation ( column[i]);

            if ( catLocation != -1) {
                categories[catLocation].count ++;
            }
        }
        //iterate over the categories and add proportions
        for ( var i = 0; i < categories.length; i ++) {
            categories[i].boxes = round((categories[i].count / column.length) *
            (boxes_down * boxes_across));
        } 
    }
    
    function addBoxes() {
        var currentCategory = 0;
        var currentCategoryBox = 0;

        var boxWidth = width / boxes_across;
        var boxHeight =  height / boxes_down;

        for(var i =0; i < boxes_down; i ++) {
            boxes.push([])
            for( var j = 0; j < boxes_across; j ++) {
                if (currentCategoryBox == categories[currentCategory].boxes) {
                        currentCategoryBox = 0;
                        currentCategory ++;
                }
                boxes[i].push(new Box( x + (j * 
                boxWidth), y + (i * boxHeight),
                boxWidth, boxHeight, 
                categories[currentCategory]));
                currentCategoryBox ++;
            }
        }
    }
    // add categories
    addCategories();
    addBoxes();
    
    this.draw = function() {
        //draw waffleQt diagram
        for( i = 0; i < boxes.length; i ++) {
            for (var j = 0; j < boxes[i].length; j ++) {
                if(boxes[i][j].category != undefined) {
                        boxes[i][j].draw();
                }  
            }
        }
    }
    this.checkMouse = function( mouseX, mouseY) {
        for ( var i=0; i < boxes.length; i ++) {
            for ( var j =0; j < boxes[i].length; j ++) {
                if(boxes[i][j].category != undefined) {
                    var mouseOver = boxes[i][j].mouseOver( mouseX, mouseY);
                    if (mouseOver != false) {
                        push();
                        fill(0);
                        textSize(20);
                        var tWidth = textWidth(mouseOver);
                        textAlign(LEFT, TOP);
                        rect (mouseX, mouseY, tWidth + 20, 40);
                        fill(255);
                        text(mouseOver, mouseX + 10, mouseY + 10);
                        pop();
                        break;
                    }
                }
                    
            }
        }
    }
        
}