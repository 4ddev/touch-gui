/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class DotElementConfiguration extends ElementConfiguration{
    constructor(e,x,y){
        super(dotElementConfiguration);
        this.e = e;
        this.posX = x;
        this.posY = y;
    }

    // @Override
    createToolBar(){

    }
}

let dotElementConfiguration= {
    active: false,
    xyOff: [1,1],
    hammerConfigurations : [{ eventType: "pan", options: {direction: Hammer.DIRECTION_ALL, threshold: 0 }}], 
 
    events: {
        
    },
    resizer: false,
    resize: false,
    eventQueue: true, 
    posX: 10,
    posY: 0,
    moveFunction: Move.moveByTransform,
}