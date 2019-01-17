/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class Pinch{
    constructor(PinchConfiguration){
        this.scalePinch = 1;
        this.pinchCallback = PinchConfiguration.pinchCallback;
    }
    pinch(ev){
        if( this.pinchLogic.pinchCallback != null ){
            if ( ev.srcEvent.type ==="pointerup") this.pinchLogic.pinchCallback.call(this,ev.scale,true);
            else this.pinchLogic.pinchCallback.call(this,ev.scale,false);
        } 
    }
}