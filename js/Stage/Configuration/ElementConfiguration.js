/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class ElementConfiguration{
    constructor(Configuration){
        this.e = Configuration.e;
        this.active = Configuration.active;
        this.buttons = Configuration.buttons;
        this.xyOff = Configuration.xyOff;
        this.hammerConfigurations = Configuration.hammerConfigurations;
        this.resize= Configuration.resize;
        this.resizer = Configuration.resizer;
        this.eventQueue = Configuration.eventQueue;
        this.posX = Configuration.posX;
        this.posY = Configuration.posY;
        this.lockedX = Configuration.lockedX;
        this.lockedY = Configuration.lockedY;
        this.duration = Configuration.duration;
        this.xBounds = Configuration.xBounds;
        this.yBounds = Configuration.yBounds;
        this.pinchCallback = Configuration.pinchCallback;
        if ( Configuration.moveFunction == null ) throw new NotInitializedException("A Movefunction was not Initialized use Move.moveByCSS, Move.moveBySVGAttr or Move.moveByTransform");
        this.moveFunction = Configuration.moveFunction;
        this.events = Configuration.events;
    }

    createToolBar(){      
    }
}


