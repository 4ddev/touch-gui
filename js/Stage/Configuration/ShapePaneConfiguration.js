/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

 Any copy or distribution is under restriction
 of its owner interests.

 DO NOT COPY - CHANGE - OR DISTRIBUTE
 OR USE THIS SOFTWARE - CODE ELSEWHERE WITHOUT
 PERMISSION OF THE AUTHOR
 ****/

class ShapePaneConfiguration extends ElementConfiguration{
    constructor(){
        super(Configuration);
    }
}
let Configuration = {
    active: false,
 
    xyOff: [100,100],
    hammerConfigurations : [{ eventType: "pan", options:{ direction: Hammer.DIRECTION_ALL , threshold: 0} }], 
 
    posX: 0,
    posY: 0,
    resizer: false,
    resize: false,
    lockedX: true,
    lockedY: false,
    moveFunction: Move.moveByTransform
}