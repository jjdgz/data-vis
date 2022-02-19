function Box (x, y, width, height, category) {
    var x = x;
    var y = y;
    var height;
    var width;
    this.category = category;
    this.mouseOver = function (mouseX, mouseY) {
        // is the mouse over this box
        if( mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
            return this.category.name;      
        }
        if(mouseX > 40 && mouseX < 240 && mouseY > 60 && mouseY < 220) {
            stroke("black");
            strokeWeight(5);
            noFill();
            rect(40, 60, 200, 200);
            noStroke();
        }
        if(mouseX > 40 && mouseX < 240 && mouseY > 320 && mouseY < 520) {
            stroke("black");
            strokeWeight(5);
            noFill();
            rect(40, 320, 200, 200);
            noStroke();
        }
        if(mouseX > 260 && mouseX < 440 && mouseY > 320 && mouseY < 520) {
            stroke("black");
            strokeWeight(5);
            noFill();
            rect(260, 320, 200, 200);
            noStroke();
        }
        if(mouseX > 480 && mouseX < 680 && mouseY > 320 && mouseY < 520) {
            stroke("black");
            strokeWeight(5);
            noFill();
            rect(480, 320, 200, 200);
            noStroke();
        }
        if(mouseX > 700 && mouseX < 900 && mouseY > 320 && mouseY < 520) {
            stroke("black");
            strokeWeight(5);
            noFill();
            rect(700, 320, 200, 200);
            noStroke();
        }
        return false;
    }
    this.draw = function () {
        strokeWeight(1);
        stroke(0);
        fill(category.color);
        rect(x, y, width, height);
    }
        
}