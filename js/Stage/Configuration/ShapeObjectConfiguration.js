/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class ShapeObjectConfiguration extends ElementConfiguration{
    constructor(){
        super(shapeElementConfiguration);
    }
}
/**
 * Add a Shape to the Pane - triggered by the animation handler
 * @param {*} isFinite Animation is finished or not
 * @param {*} ev The Source Event
 */
let animationHandler = function(isFinite,ev){
    if( isFinite ){
        //console.log(this);
        var element = this.hammerObject.element.cloneNode(true);

        var mouseposition = Selector.getMousePositionRelativToPane(ev);
        var configuration= new PaneObjectConfiguration();
        
        configuration.e = SVGLib.resizeTo(element);
        SVGLib.createRecognizeableSVG(configuration.e);

        configuration.posX = mouseposition.x; // Set the Position of the new PaneObject to the MousePosition
        configuration.posY = mouseposition.y; 
        
        var paneObject = drawBoxApplication.add(configuration); // Create the new DrawBoxElement
        
        paneObject.moveLogic.restorePosition.call(paneObject,mouseposition.x,mouseposition.y);
        EventQueue.pop();
        EventQueue.push(element.id,function(){
            paneObject.remove.call(paneObject);
        }, null);
 
    }else{
        this.moveLogic.oldPosX = 10;
        this.moveLogic.oldPosY = 0;
    }
}

let shapeElementConfiguration= {
    active: false,
    xyOff: [1,1],
    hammerConfigurations : [{ eventType: "pan", options: {direction: Hammer.DIRECTION_ALL, threshold: 0 }}], 
 
    events: {
        animation: animationHandler
    },
    resizer: false,
    resize: false,
    eventQueue: true, 
    posX: 10,
    posY: 0,
    moveFunction: Move.moveByCSS,
}