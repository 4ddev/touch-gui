/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class ScalePointerConfiguration extends ElementConfiguration{
    constructor(){
        super(scaleConfiguration);
    }
}
let scalePointer = function(ev){
    drawBoxApplication.scaleActivePane(ev);
}

let scaleConfiguration = {	
    active: false,
 
    events: {
        move: scalePointer,
    },
    
    hammerConfigurations : [{ eventType: "pan", options: {direction: Hammer.DIRECTION_ALL, threshold: 1 }}], 

    resizer: false,
    resize: false,
    eventQueue: false,
    posX: 90,
    posY: document.getElementById("scalePane").offsetTop,
    lockedY: true,
    xBounds: { min: 0, max: 190 },
    moveFunction: Move.moveByCSS
}