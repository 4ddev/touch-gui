/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class GroupObjectConfiguration extends ElementConfiguration{
    constructor(div,bounds){
        super(groupPaneConfiguration);
        this.posX = bounds.x;
        this.posY = bounds.y;
        this.e = div;
    }
}
// Group Element Configuration - see ElementConfiguration for full list of supported parameters
let groupPaneConfiguration = {	
    active: false,


    keyEventHandler: null,
    xyOff: [100,100],
    hammerConfigurations : [{ eventType: "pan", options: {direction: Hammer.DIRECTION_ALL, threshold: 1 }}], 

    resizer: true,
    resize: true,
    eventQueue: true,
    events: paneObjectEvents
}

