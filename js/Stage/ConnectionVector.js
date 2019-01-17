/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let activeVectorElement= null;
class ConnectionVector{
    constructor(pane){
        this.height = 10;
        this.source = null;
        this.target = null;
        this.pane = pane;
        this.template = "rect";
        this.node = {};
        this.createVector();
        this.addListener();
    }

    /**
     * Create an Vector from a to b - any element was specified by the Targetbutton which is called 
     * when the function add Vector is triggerd
     */
    createVector(){ 
        this.node.vector1 = {};
        this.node.vector2 = {};
        this.node.pointer = {};
        this.node.pointer.orientation = 0;

        this.node.vector1.dom = document.createElementNS("http://www.w3.org/2000/svg","line");
        this.node.vector2.dom = document.createElementNS("http://www.w3.org/2000/svg","line");
        this.node.pointer.dom = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        
        this.node.vector1.dom.classList.add("vector");
        this.node.vector2.dom.classList.add("vector");
        PaneObject.getDOMElement(this.pane).appendChild( this.node.vector1.dom );
        PaneObject.getDOMElement(this.pane).appendChild(this.node.vector2.dom);
        PaneObject.getDOMElement(this.pane).appendChild(this.node.pointer.dom);
    }
    /**
     * Add the pointervent to the dot - should be removed on every dot -
     * to prevent memory leaks 
     * @param {*} ev 
     */
    pointerEvent(ev){
        /*
        var position = Selector.getPointPositionReletiveToPane(ev.clientX,ev.clientY);
        this.test = document.createElementNS("http://www.w3.org/2000/svg","circle");
        PaneObject.getDOMElement(this.pane).appendChild(this.test);
        //console.log(this.test);

        this.test.setAttribute("cx","5");
        this.test.setAttribute("cy","5");
        this.test.setAttribute("r","5" );
        this.test.setAttribute("stroke","black");
        this.test.setAttribute("stroke-width","3");
        this.addDot(position);
        //console.log( position ) ;
        */
    }
    /**
     * Add the some special dot to this connection vector where the user is able to 
     * change the vector in the right position 
     * @param {*} position 
     */
    addDot(position){
        //console.log(position);
        position.x = position.x - 5;
        position.y = position.y - 5;
        var configuration = new DotElementConfiguration(this.test,position.x,position.y);
        var paneObject= new PaneObject(configuration,this.pane);
        paneObject.setParents(this.pane);
        PaneObject.getDOMElement(this.pane).appendChild(this.test);
        
    }
    /**
     * Add the Pointerup listener 
     */
    addListener(){
        this.listener = this.pointerEvent.bind(this);
        this.node.vector1.dom.addEventListener("pointerup",this.listener); 
        this.node.vector2.dom.addEventListener("pointerup",this.listener);   
    }
    /**
     * Remove the pointerup events 
     */
    removeListener(){
        if( this.listener != null ){
            this.node.vector1.dom.removeEventListener("pointerup",this.listener);
            this.node.vector2.dom.removeEventListener("pointerup",this.listener);
        }
    }


    static setElement( object ){
        activeVectorElement = object;
    }

    static getElement(){
        return activeVectorElement;
    }
    static clearElement(){
        activeVectorElement = null ;
    }
    /**
     * 
     * @param {source: PaneObject} source 
     */
    setSource(source){
        //console.log(source);
        this.source = source;
    }
    /**
     * 
     * @param {target: PaneObject} target 
     */
    setTarget(target){
        this.target = target;
    }
    /**
     * redraw the pointer 
     */
    draw(){
        //console.log( "TEST" );
        var pointA = ConnectionVector.getCoordsByAttr(PaneObject.getDOMElement(this.source));
        var sourceDimension = this.source.dimension;

        //console.log("POINTA",pointA);
    
        var pointB = ConnectionVector.getCoordsByAttr(PaneObject.getDOMElement(this.target) );
        //console.log( "POINTB", pointB);

        //console.log( this.source.dimension );
        this.node.vector1.x1 = parseFloat(pointA[0]);
        this.node.vector1.y1 = parseFloat(pointA[1]);
        this.node.vector1.x2 = parseFloat(pointB[0]);
        this.node.vector1.y2 = parseFloat(pointA[1]);
        this.node.vector2.x1 = parseFloat(pointB[0]);
        this.node.vector2.y1 = parseFloat(pointA[1]);
        this.node.vector2.x2 = parseFloat(pointB[0]);
        this.node.vector2.y2 = parseFloat(pointB[1]);

        this.node.vector1.dom.setAttribute("x1",this.node.vector1.x1 );
        this.node.vector1.dom.setAttribute("y1",parseFloat(pointA[1] ));
        this.node.vector1.dom.setAttribute("x2",parseFloat( pointB[0] ));
        this.node.vector1.dom.setAttribute("y2",parseFloat( pointA[1])) ;
        this.node.vector2.dom.setAttribute("x1",parseFloat(pointB[0]) );
        this.node.vector2.dom.setAttribute("y1",parseFloat(pointA[1] ));
        this.node.vector2.dom.setAttribute("x2",parseFloat( pointB[0] ));
        this.node.vector2.dom.setAttribute("y2",parseFloat( pointB[1])) ;

        var coor =  ConnectionVector.rotatePointer("7.5 0,0 15,15 15",90);
        
        coor=  ConnectionVector.pointerOffset(coor, parseFloat(pointB[0])+7.5,parseFloat(pointB[1])+7.5 );

        this.node.pointer.dom.setAttribute("points",coor);
    }
    /**
     * Change the offset of some pointer in the vector room-
     * @param {*} pointer Add some offset to this element which is described by the coordnistates of x-y - also will calculate any some offset to this element 
     * so it can be changed off x-y 
     * @param {*} xOffset The X-Axis coord 
     * @param {*} yOffset The Y-Axis coord 
     */
    static pointerOffset(pointer, xOffset,yOffset){
        var coords = pointer.split( "," );
        var point=null;
        var result = "";
        
        while( (point=coords.pop()) != null ){
            point = point.split( " " );
            
            var x = point[0];
            var y;
            if ( point.length > 1 ){
                y = point[1];
            }else{
                y = point[0];
            }
            
            result += parseFloat(x)+xOffset;
            result += " ";
            result += parseFloat(y)+yOffset;
            result += ",";
        }
    
        result = result.substring(0, result.lastIndexOf(","));
        
        return result;
    }
    /**
     * Active when a user moved an item which this element was invobolve 
     */
    activeMove(){
        if( this.source != null ){
            this.source.setVector.call(this.source, this );
        }
        if (this.target != null ){
            this.target.setVector.call(this.target, this );
        }
    }
    /**
     * set the layout of this vector 
     */
    setLayout(){

    }
    /**
     * This method retuns the Coordinates of a SVG in the Drawbox 
     * by extracting the Coords of the css translate property 
     */
    static getCoordsByTranslate(o){
        // translateRegEx -> @see Move.js
        //console.log(o.style.translate);
        return [ o.getAttributeNS(null,"style").search( translateRegEx ) ];
    }
    /**
     * This method returns the coordinates of a DOM element by
     * the Attribute X / Y 
     */
    static getCoordsByAttr(o){
        return [o.getAttributeNS("","x"), o.getAttributeNS("","y")];
    }
    /**
     * This method returns the coordinates of a DOM by 
     * the Left and Top property 
     */
    static getCoordsByCss(o){
        return  [o.getAttributeNS(null,"left"), o.getAttributeNS(null,"top")];
    }

    
	repaint(movedObject,x,y){
        if( this.template === "direct" ){
            if( this.target === movedObject ){
                //console.log(movedObject);
                this.node.vector1.dom.setAttributeNS(null,"x2",x);
                this.node.vector1.dom.setAttributeNS(null, "y2", y );
            }else if ( this.source === movedObject ){
                this.node.vector1.dom.setAttributeNS( null, "x1",x );
                this.node.vector1.dom.setAttributeNS(null,"y1",y );
            }
        }else{
            var pointerOrientation = null;
            if ( this.source.moveLogic.holderX < this.target.moveLogic.holderX && 
                 this.source.moveLogic.holderY == this.target.moveLogic.holderY ){
                pointerOrientation = rotatePointerByDirection(1);    
                console.log( " EAST SOURCE - WEST TARGET ");
            }else if( this.source.moveLogic.holderX < this.target.moveLogic.holderX &&
                      this.source.moveLogic.holderY < this.target.moveLogic.holderY ){
                        if( (this.source.moveLogic.holderX >  (this.target.moveLogic.holderX-50) ) &&
                        ( this.target.moveLogic.holderX < (this.source.moveLogic.holderX+50) ) ){
                            console.log( "NORTH Target | South Source  ");
                            pointerOrientation= rotatePointerByDirection(2);
                        }
                         
                console.log( "EAST|SOUTH SOURCE -> WEST|NORTH TARGET");
            }else if( this.source.moveLogic.holderX < this.target.moveLogic.holderX && 
                      this.source.moveLogic.holderY > this.target.moveLogic.holderY ){
                          console.log( this.source.moveLogic.holderX - 50 );
                          console.log( this.target.moveLogic.holderX - 50 );
                          if( (this.source.moveLogic.holderX >  (this.target.moveLogic.holderX-50) ) &&
                          ( this.target.moveLogic.holderX < (this.source.moveLogic.holderX+50) ) ){
                            console.log( "NORTH SOURCE ");
                            pointerOrientation = rotatePointerByDirection(3);
                          }
                         
                console.log( "EAST|NORTH SOURCE -> WEST|SOUTH TARGET" );
            }
            console.log( pointerOrientation );
            if( this.target === movedObject ){

                this.node.vector1.x2 = x;
                this.node.vector1.dom.setAttributeNS(null,"x2",x);
                
                this.node.vector2.x1 = x;
                this.node.vector2.dom.setAttributeNS(null,"x1",x);

                this.node.vector2.x2 = x;
                this.node.vector2.dom.setAttributeNS(null,"x2",x);

                this.node.vector2.y2 = y;
                this.node.vector2.dom.setAttributeNS(null,"y2",y);
                this.node.pointer.orientation += 90;

                var coor =  ConnectionVector.rotatePointer("7.5 0,0 15,15 15",this.node.pointer.orientation);
                coor=  ConnectionVector.pointerOffset(coor, (x),(y)-7.5 );
                this.node.pointer.dom.setAttribute("points",coor);
                
    
            }else if ( this.source === movedObject ){
                this.node.vector1.x1 = x;
                this.node.vector1.dom.setAttributeNS(null,"x1",x);

                this.node.vector1.y1 = y;
                this.node.vector1.dom.setAttributeNS(null,"y1",y);

                this.node.vector1.y2 = y;
                this.node.vector1.dom.setAttributeNS(null, "y2", y );

                this.node.vector2.y1 = y;
                this.node.vector2.dom.setAttributeNS(null,"y1",y); 
                
            }
        }
    }

    static rotatePointerByDirection( pointer, direction ){
        var fields = "";
        if( direction == 1 ){
            fields = rotatePointer( pointer, 90 );
        }
        if( direction == 1 ){
            fields = rotatePointer( pointer, 180 );

        }
        if( direction == 1 ){
            fields = rotatePointer( pointer, 270 );
        }   
        if( direction == 1 ){
            fields = rotatePointer( pointer, 0);   
        }
        return fields ;
    }

    /**
     * 
     * @param {*} pointer 
     * @param {*} deg 
     */
    static rotatePointer( pointer,deg ){
        var coords = pointer.split( "," );
        var point=null;
        var result = "";
        deg = deg * Math.PI/180;
        while( (point=coords.pop()) != null ){
            point = point.split( " " );
            
            var x = point[0];
            var y;
            if ( point.length > 1 ){
                y = point[1];
            }else{
                y = point[0];
            }
            
            result += (x*Math.cos(deg)-y*Math.sin(deg)).toFixed(2);
            result += " ";
            result += (y*Math.cos(deg)+x*Math.sin(deg)).toFixed(2);
            result += ",";
        }
        
        result = result.substring(0, result.lastIndexOf(","));
        
        return result;
    }
    destroy(){
        this.node.vector1.dom.parentNode.removeChild( this.node.vector1.dom ) ;
        this.node.vector2.dom.parentNode.removeChild( this.node.vector2.dom );
        this.source.removeConnection.call( this.source,  this );
        this.target.removeConnection.call( this.target, this ) ;
        this.removeListener.call(this);
        this.source = null;
        this.target = null ;
        this.pane = null ;
        this.node = null;
    }

}
 