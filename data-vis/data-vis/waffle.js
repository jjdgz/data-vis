function Waffle () {
    this.name = 'Product defects: by type';
    this.id = 'defects-by-type';
    this.loaded = false;                    
    this.preload = function() {
        var self = this;
        this.data = loadTable("data/product-defects/productData.csv", "csv", "header",
        function(table) {
            self.loaded = true;
        });
        //callback function to set the value this.loaded to true
        
        // this.dataQt = loadTable("data/product-defects/dataQt.csv", "csv", "header");
    }
    var marginSize =440;
    var topPosition = 15;
    this.layout = {
        marginSize:marginSize,
        leftMargin: marginSize,
        topPosition:topPosition
    }
    this.title = 'Proportion of good and defective products YTD'
    this.drawTitle = function() {
        fill(0);
        noStroke();
        strokeWeight(0);
        text(this.title,
            this.layout.leftMargin,
            this.layout.topPosition,
             );    
    }
    
    var x = 40;
    var y = 60;
    var height = 200;
    var width = 200;
    var boxes_down = 10;
    var boxes_across = 10;
    var column = data.getColumn("flag");
    var values = ['good', 'type 1', 'type 2', 'type 3','type 4', 'type 5'];
    var possibleValues = values;
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
    // this.drawTitle();
    this.draw = function () {
        if ( !this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
        this.drawTitle();
        fill(0);
        strokeWeight(0); 
        noStroke();
        text("Overall Defects YTD", 220, 280);
        
        for ( i = 0; i < 1; i ++) {
            //draw waffle diagram
            for( i = 0; i < boxes.length; i ++) {
                
                for (var j = 0; j < boxes[i].length; j ++) {
                    if(boxes[i][j].category != undefined) {
                        boxes[i][j].draw();
                    }  
                }
            } 
        }
        for(var i = 0; i < 1; i ++) {
                this.checkMouse(mouseX, mouseY);
        }
        for ( i = 0; i < wafflesQt.length; i ++) {
            fill(0);
            strokeWeight(0);
            noStroke;
            text("Quarter " + (i+1) + " Defects", 200 + (i*220), 550);
            wafflesQt[i].draw();
        }
        for(var i = 0; i < wafflesQt.length; i ++) {
            wafflesQt[i].checkMouse(mouseX, mouseY);
        }
    }
    this.setup = function() {
        // Font defaults.
        textSize(20);
    };

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