/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class StageConfiguration extends ElementConfiguration{
    constructor(){
        super(paneConfiguration);
        this.wrapper = document.getElementById("drawBoxWrapper");
        this.e = document.getElementById("drawBox");
        this.tab = document.getElementsByClassName("tabElement")[0];
    }
}

let paneEvents = {
    click: function(){
        
    },
    move: function(e){
        Coordinates.move(this.getBaseInformation());
    },
    animate: function(){
        
    }
}

let scaleCallback = function(ev,isFinal){
    drawBoxApplication.setScalerPosition(this,ev,isFinal);
}

let paneConfiguration = {
    e: document.getElementById("drawBox"), 
    active: true, // INVERTED LOGIC
 
    events:{
        animation: paneEvents.animate,
        click: paneEvents.click,
        move: paneEvents.move,
 
    },
 
    xyOff: [1,1],
    hammerConfigurations: [ { eventType: "pan",options:{direction: Hammer.DIRECTION_ALL, threshold: 1} } ,
                            { eventType: "pinch", options: { }}],
    resizer: false, 
    resize: false, 
    eventQueue: true,
    posX: 0,
    posY: 0,
    pinchCallback: scaleCallback,
    moveFunction: Move.moveByTransform,
}