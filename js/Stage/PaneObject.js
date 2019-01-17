/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let preventGhostClick = false;

class PaneObject extends PaneParentObject{
    /**
	 * Create a new PaneObject
	 * T< ? extends ElementConfiguration> { 
		* @description All Elements are wrapped in PaneObjectConfiguration create it with the parameter given below
		* @param e The HTML DOM Node
		* @param active    Boolean - true Element is active - false element is disabled
		* @param animation The Animation when an Element is moved on the Pane
		* @param move A Callback function which will be called when it moves
		* @param click     Set the Clickhandler of this Element
		* @param keyEventHandler Set the KeyEventHandler
		* @param xyOff     Raster Size [ x,y ]
		* @param hammerOptions minimum requirements { eventType: HAMMER-EVENT-TYPES, options: { direction, threshold } } - for all other see HammerOptions 
		* @param {true|false} resizer Adds Resize Elements to this PaneObject 
		* @param {true|false} resize  The Parent will be resized when the element is out of bounds
		* @param {true|false} eventQueue True - it will push any change to the Undo Stack
		* @param posX The Initial Position of this element x Axis
		* @param posY The Initial position of this element y Axis
		* @param lockedX Lock the x Var - dont accept pan in x axis
		* @param lockedY Lock the y Var - dont accept pan in y axis 
	 * }
	 * @param rootPane The Root Pane Element - do not confuse with master - Groups can also be a master
	 */
	constructor( PaneObjectConfiguration, rootPane ){
		
		super( PaneObjectConfiguration,rootPane);
		
		this.toolBarElement= PaneObjectConfiguration.toolBar;
		this.objectControl = null;
		this.connection = [];
		this.events = PaneObjectConfiguration.events!=null? PaneObjectConfiguration.events:{};
	
		this.resizer = PaneObjectConfiguration.resizer ? new ResizeElement(PaneObjectConfiguration.e,this): null;
		this.resize = PaneObjectConfiguration.resize;
		
		this.move = PaneObjectConfiguration.move;
		this.eventQueue = PaneObjectConfiguration.eventQueue;

		if ( PaneObjectConfiguration.xyOff != null ){
			this.raster = {
				x: PaneObjectConfiguration.xyOff[0],
				y: PaneObjectConfiguration.xyOff[1],
				findPosition: 	function(x,y){
					return [ (parseFloat(Math.round(x/this.x))*this.x), (parseFloat(Math.round(y/this.y))*this.y) ];
				}
			};
		}
		this.addPointerDownEvent();   // Add some Logic to the PaneObject
		this.addKeyEvents(this.events.keyEventHandler);          // Add KeyEvents to this Object
 
	}
	/**
	 * Set the stage of this element 
	 * @param {*} stage 
	 */
	setStage(stage){
		this.stage = stage;
	}
	/**
	 * ClickEvent - called when the element is ready to be clicked 
	 */
	clickEvent(){	
		if( !this.stopPropagation ){
			if( !preventGhostClick ) {
				preventGhostClick = true;
				this.wasDragged = false;
	 
				if (this.events.click != null ) this.events.click.call(this);
				PaneParentObject.activateParents(this);	
			}
		}
	}
	/**
	 * Add the logic to this element which is described by this element which is declared to prevent ghostclicks 
	 */
	addPointerDownEvent(){
		this.hammerObject.element.addEventListener("mousedown", this.pointerdown.bind(this),{passive: true});
		this.hammerObject.element.addEventListener("mouseup", this.pointerup.bind(this),{passive: true});
		this.hammerObject.element.addEventListener("touchstart",this.pointerdown.bind(this),{passive: true});
		this.hammerObject.element.addEventListener("touchend",this.pointerup.bind(this),{passive: true});
	}
	/**
	 * Disable the pointer event by removeing the events 
	 */
	disablePointerDownEvent(){
		this.hammerObject.element.removeEventListener("touchstart",this.pointerdown.bind(this));
		this.hammerObject.element.removeEventListener("mousedown",this.pointerdown.bind(this));
		this.hammerObject.element.removeEventListener("mouseup",this.pointerup.bind(this));
		this.hammerObject.element.removeEventListener("touchend",this.pointerup.bind(this));
	}
	/**
	 * STart the parentsmakeit active so it can receive some evnets
	 * @param {*} ev 
	 */
	pointerup(ev){
		ev.stopPropagation();	
		if( !this.stopPropagation &&  !this.wasDragged && !preventGhostClick ){
			preventGhostClick = false;
			if( this.events.longTap != null ) this.events.longTap();
			PaneParentObject.activateParents(this);
		}
	}
	
    /**
	 * Set the LongTap Event Callback -
	 *
     * @param e function() -> some callback which will be triggerd if an LongTap occurs
     */
	setLongTap(e){
		this.events.longTap = e;
	}

    /***
	 * Disables Pointerdown should never be changed otherwise ghost clicks will be performed
     */
	pointerdown(){
		if( this.stopPropagation ) return;
		if ( this.master == null ) return;
		preventGhostClick = false;
		PaneParentObject.disableParents(this);
		this.stamp = Date.now();
		this.wasDragged = false;
	}
	
    /**
	 * Update the Position in reference to his master
     */
	updatePosition(){
		if( this.master != null ){
			this.moveLogic.posX -= this.master.moveLogic.posX;
			this.moveLogic.posY -= this.master.moveLogic.posY;
			this.hammerObject.element.style.left = this.moveLogic.posX+"px";
			this.hammerObject.element.style.top = this.moveLogic.posY+"px";
		}
	}
	/**
	 * Update the Child positions of this Element
	 * This method will iterate over any children and set the position in reference to this master
	 * by calling the updatePosition() method
	 */
	updateChildPosition(){
		var array = Object.keys(this.children);
		if( this.children != null && array.length > 0 ){
			for( var i = 0;i<array.length;i++ ){
				this.children[array[i]].updatePosition.call(this.children[array[i]]);
			}
		}
	}
	/**
	 * Remove the connection of this elements - should be called whenever the element was removed 
	 * from the pane - also this element prevents memory leaks 
	 */
	removeVectors(){
		//console.log( this.connection );
		while( this.connection.length > 0 ){
			var vector = this.connection.pop();
			vector.destroy.call(vector);
		}
		
	}
    /**
	 * Remove this PaneObject from the UI tree
	 * also remove's any relation between this object and his master
     */
	remove(){
		this.removeVectors.call(this );
		this.master.removeChildren(this);
		
		this.master.hammerObject.element.removeChild(this.hammerObject.element);
		this.removeHammerEvents();
		if( this.toolBarElement !== null ){
			ToolBar.clearIfActive(this.hammerObject.element.id);
		}
		this.disablePointerDownEvent();
		if( this.objectControl != null ) {
			//console.log("DESTROY BUTTONS" );
			this.objectControl.destroy();
		}
		if( this.resizer != null ) this.resizer.destroy();
		this.hammerObject.destroy();
		for (var name in this) {
			if (this.hasOwnProperty(name)) {
			  this[name] = null;
			  delete this[name];
			}
			else {
			  //console.log(name); // toString or something else
			}
		  }
		delete this;
	}
	/**
	 * Add the KeyEventHandler to this Object
	 */
	addKeyEvents(){
		this.hammerObject.element.addEventListener('keyup', this.keyEvent.bind(this));
		this.hammerObject.element.setAttribute('tabindex','0');
	}
	
	/**
	 * Called by any KeyEvent - 
	 * This method will invoke any KeyEventHandler which was initialized
	 * at creation of this Object
	 * @param {*} ev 
	 */
	keyEvent(ev){
		ev.stopPropagation();
		if ( this.stopPropagation ) return;
		if( this.events.keyEventHandler != null ) this.events.keyEventHandler.call(this,ev);
		else if ( ev.which === 46 ){
			this.remove.call(this);
		}
	}
	disableKeyEvent(){
		this.hammerObject.element.removeEventListener('keyup', this.keyEvent.bind(this));
	}

    /**
	 * Get the ToolBarPages Object
     * @param toolBar
     */
	setToolBar(toolBar){
		this.toolBarElement = toolBar;
	}

    /**
	 * Get The ToolBarPages Object
     * @returns {null}
     */
	getToolBar(){
		return this.toolBarElement;
	}
	/**
	 * Set a Collection of Buttons to this PaneObject
	 * @see ButtonContainer 
	 * @param {ButtonContainer} buttonDescription 
	 */
	setButtons(buttonDescription){
		this.objectControl =  buttonDescription;
	}
	restore(){
		drawBoxApplication.restore(this.hammerObject.element.id);
	}
	/**
	 * Create some basic informaton about this item so it can be obscured by some other function -
	 * or events 
	 */
	getBaseInformation(){
		return {x: this.moveLogic.holderX,
			y:this.moveLogic.holderY,
			height: this.hammerObject.element.offsetHeight,
			width: this.hammerObject.element.offsetWidth,
			xLock : this.moveLogic.lockedX,
			yLock: this.moveLogic.lockedY,
			xBounds: this.moveLogic.xBounds,
			yBounds: this.moveLogic.yBounds,
			scale: this.pinchLogic.scalePinch,
		 };
	}
	/**
	 * @return { 1: if no scale in pinchLogic found | scale } 
	 */
	getScale(){
		if( this.pinchLogic != null ){
			return this.pinchLogic.scalePinch;
		}else
			return 1;
	}
/**
 * Get the DOMElement of this PanEObject 
 * @param {PaneObject} o  Get the HTML-DOM-ELEMENt of this PaneObject 
 */
	static getDOMElement(o){
		//console.log( o );
		return o.hammerObject.element;
	}
	/**
	 * Set some connection vector 
	 * @param {*} vector 
	 */
	setVector(vector){
		//console.log("TEST",vector);
		this.connection.push (  vector );
		//console.log( vector );
	}
	/**
	 * Test if this PaneOBject does have some Connection 
	 */
	hasConnection(){
		if( this.connection != null ) return true;
		else return false;
	}
	/**
	 * Get the connection of this PaneOBject 
	 */
	getConnections() {
		return this.connection;
	}
	removeConnection(vector){
		if ( this.hasConnection() ){
			if ( this.connection.indexOf( vector ) > -1 ){
				//console.log("Connection", this.connection  ,"elment found ");
				//console.log( this.connection.indexOf( vector ));
				
				this.connection.splice( this.connection.indexOf( vector ), 1 );
				//console.log( this.connection );
			}
		}
	}
}
