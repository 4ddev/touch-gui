/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let translateRegEx = /translate\(.*?\)/;
class Move{ 
    constructor(MoveLogicConfiguration) {
        this.lockedX= null;
        this.lockedY= null;
        this.posX = 0;
        this.posY = 0;
        this.dragging=false;
        this.holderX= null;
        this.holderY= null;
        this.duration = null;

        if( MoveLogicConfiguration.moveFunction == null ){
            throw new NotInitializedException("A Movefunction was not specified - use Move.moveByCSS, Move.moveByTransform or Move.moveBySVGAttr");
        }
 
        this.moveTo = MoveLogicConfiguration.moveFunction;
        this.init(MoveLogicConfiguration);
    }

    /**
     * Move a function by setting Top/Left property 
     * - this cause massive amount of cpu by Edge - not recommended 
     * @param { object: PaneObject }
     * @param {x: string} x 
     * @param {y: string} y 
     */
    static moveByCSS(object,x,y){
        object.hammerObject.element.style.left = x+"px";
        object.hammerObject.element.style.top  = y+"px";
    }
    /**
     * Move an PaneObject by setting the transform: translate css property 
     * - this should handle the cpu usage by edge - use this instead of moveByCSS
     * @param {object: PaneObject} object 
     * @param {x: string} x 
     * @param {y: string} y 
     */
    static moveByTransform(object,x,y){
        if ( object.hammerObject.element.style.transform.search(translateRegEx) > -1 ){
            object.hammerObject.element.style.transform = object.hammerObject.element.style.transform.replace(translateRegEx,"translate("+x+"px,"+y+"px)");
        }else {
            object.hammerObject.element.style.transform  += " translate("+x+"px,"+y+"px)";
        }
    }
    /**
     * Use this method if you want to change a position of a nested svg
     * @param {object:PaneObject} object 
     * @param {x: string} x The X position of the SVG in another SVG 
     * @param {y: string} y The Y position in a nested SVG  
     */
    static moveBySVGAttr( object,x,y ){
        if ( object.hasConnection != null && object.hasConnection.call(object) ){
            var connections = object.getConnections.call( object );
            for( var i =0;i<connections.length; i++ ){
                connections[i].repaint.call( connections[i], object, x,y );
            }
        }
        object.hammerObject.element.setAttributeNS(null,"x",x);
        object.hammerObject.element.setAttributeNS(null,"y",y);
    }

    /**
     * Initialize the movelogic
     * @param {*} MoveLogicConfiguration throws NotInitializedException when PosX or PosY not defined
     */
    init(MoveLogicConfiguration){
        this.lockedX = MoveLogicConfiguration.lockedX;
        this.lockedY = MoveLogicConfiguration.lockedY;
        if ( isNaN(MoveLogicConfiguration.posX) || isNaN(MoveLogicConfiguration.posY ) ) throw new NotInitializedException("PosX | PosY not defined!");
        this.posX = MoveLogicConfiguration.posX ;
        this.posY = MoveLogicConfiguration.posY;
        this.dragging = false;
        this.holderX = MoveLogicConfiguration.posX;
        this.holderY = MoveLogicConfiguration.posY;
        this.xBounds = MoveLogicConfiguration.xBounds;
        this.yBounds = MoveLogicConfiguration.yBounds;
    }

    updateObjectPositions(){
        this.moveLogic.dragging = false;
        this.moveLogic.posX = this.moveLogic.holderX;
        this.moveLogic.posY = this.moveLogic.holderY;
      
        var findNearestPosition;
        if ( this.raster != null ){
            findNearestPosition = this.raster.findPosition.call(this.raster, this.moveLogic.posX, this.moveLogic.posY);
        }else{
            findNearestPosition = [ this.moveLogic.posX, this.moveLogic.posY ];
        }
        this.moveLogic.restorePosition.call(this, findNearestPosition[0],findNearestPosition[1]);
    }
    /**
     * This function Set an Element to a specific position on the screen 
     * Also it will update the variables referenced by this paneobject
     * @param {x: int} x 
     * @param {y: int} y 
     */
    restorePosition(x,y){
        this.moveLogic.posX  = x;
        this.moveLogic.posY = y;
        this.moveLogic.holderX = x;
        this.moveLogic.holderY = y;

        this.moveLogic.moveTo(this,x,y);
   }
    /**
     * Move an Element to a specific position triggered by the PaneObject
     * @param {ev: HammerEvent} ev 
     */
    movePosition(ev){
        if ( !this.stopPropagation ){
            
            if ( ev.srcEvent.type === "pointerup" || ev.srcEvent.type==="pointercancel" ){
                this.moveLogic.updateObjectPositions.call(this);

                if ( this.events.animation != null  )this.events.animation.call(this,true,ev);

                if( this.master !== null && this.master !== "undefined" && this.resize ) {
                    ResizeParent.checkIsInBox({
                        x: this.moveLogic.posX,
                        y: this.moveLogic.posY,
                        height: this.dimension.width,
                        width: this.dimension.height
                    }, this.master , true);
                }
                if( this.moveLogic.duration != null ){
                    
                }
                PaneParentObject.activateParents(this);
            }

            else if ( ev.srcEvent.type === "pointermove") {
                
                if ( !this.moveLogic.dragging ){
                    this.moveLogic.dragging = true;
                    this.wasDragged = true;  
                  
                    if( this.eventQueue ) {
                        var lastObject =  [ this.moveLogic.posX,this.moveLogic.posY ];
                        var restoreFunction = function(lIObject ){
                            var restore = this.moveLogic.restorePosition.bind(this,lastObject[0],lastObject[1]); 
                            restore();
                        };
                        EventQueue.push(this.hammerObject.element.id,restoreFunction.bind(this,lastObject));
                    }
                    //console.log(this);
                    if ( this.events.animation != null )this.events.animation.call(this,false,ev);
                }
                this.moveLogic.nextStep.call(this,ev);
            }
        }
    }

    nextStep(ev){
        var scale = this.rootPane.getScale();
        
        if( !this.moveLogic.lockedX ){
            // Test if Elements could be out of bounds 
            // If there was xBounds defined - it will move to x max and min 
            if (!(this.moveLogic.xBounds != null && 
                (this.moveLogic.posX+ev.deltaX > this.moveLogic.xBounds.max || this.moveLogic.posX+ev.deltaX < this.moveLogic.xBounds.min)) ){
                if ( this.rootPane.getElementId() === this.getElementId()){ 
                    // A RootPane can directly moved on the Stage - should changed when Stages are wrapped 
                   this.moveLogic.holderX = this.moveLogic.posX+((ev.deltaX));
                }
                else 
                this.moveLogic.holderX = this.moveLogic.posX+((ev.deltaX)*(1/scale));
            }
        }else{
            this.moveLogic.holderX = this.moveLogic.posX;
        }

        if( !this.moveLogic.lockedY ){
            if (!(this.moveLogic.yBounds != null && 
                (this.moveLogic.posY+ev.deltaY > this.moveLogic.yBounds.max ||  this.moveLogic.posY+ev.deltaY < this.moveLogic.yBounds.min)) ){
                    if ( this.rootPane.getElementId() === this.getElementId()){
                        // A RootPane can directly moved on the Stage - should changed when Stages are wrapped 
                        this.moveLogic.holderY = this.moveLogic.posY+((ev.deltaY));  
                    }
                    else 
                    this.moveLogic.holderY = this.moveLogic.posY+((ev.deltaY)*(1/scale));
                
            }
        }else{
            this.moveLogic.holderY = this.moveLogic.posY;
        }

        this.moveLogic.moveTo(this,this.moveLogic.holderX,this.moveLogic.holderY);

        if ( this.events.move != null ) {
            this.events.move.call(this,this.getBaseInformation());
        }
    }
}