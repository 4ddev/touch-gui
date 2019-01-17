var Memory = function(){
    drawBoxApplication.add(new PaneObjectConfiguration());
}

var memTest = function(amount){

    for( var i =0;i<amount;i++ ){
        var b = new PaneObjectConfiguration();
        b.posX = (i*20%1000);
        b.posY = (i*20%1000);
        var a = document.getElementById("shapeContainerElement12");
        b.e = a.cloneNode(true);
        drawBoxApplication.add(b);
    }  

}