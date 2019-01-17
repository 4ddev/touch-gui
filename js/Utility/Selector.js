/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

let objectPrimary = null;
 
class Selector{
	 constructor(toolBox){
		 this.offset = 0;
		 this.activated = true;
		 this.toolBox = toolBox;
		 this.width = 0;
		 this.height = 0;
		 this.posX = 0;
		 this.posY = 0;
		 this.store = [];
 		 this.object = document.createElement("div");
		 this.object.setAttribute("id","captureObject");
		 this.object.style.left="0px";
		 this.toolBox.div.appendChild(this.object);
		 objectPrimary = this;
		 this.removeSelector();
	 }
	 
	 showSelector(){
		 this.object.style.display="block";
	 }
	 
	 removeSelector(){
		this.object.style.display="none";
	 }
	 /**
	  * Clear the Selector Storage
	  */
	 clearStore(){
		 this.store = [];
	 }
	 findParent(){
		var array = Object.keys(objectPrimary.store);
		if( array.length == null ) return;
		for( let i=0;i<array.length ; i++ ){
			objectPrimary.store[array[i]]
		}
	 }
	 /**
	  * Test if the PaneObject is in the Storage
	  * @param e PaneObject element 
	  * @returns {*} the PaneObject otherwise null
	  */ 
	 static isIn( e ){
		 try{
			return objectPrimary.store[e.hammerObject.element.id];
		 } catch( ex ){
			return null;
		 }
	 }
	 
	 /** 
	  * Get the the Storage
	  * @returns {[]} Storage Array
	  */
	  static getStorage(){
		  return objectPrimary.store;
	  }
	  /**
	   * Set the bounds of the next grouped element
	   */
	  static setBounds(object){
		 objectPrimary.posX =  object.x;
		 objectPrimary.posY = object.y; 
		 objectPrimary.width = object.width;
		 objectPrimary.height = object.height;
	  }

     /**
	  * Create a Group
      * @param styleClass
      * @param animationMoveClass
      * @returns {*}
      */
	 static groupObjects( styleClass, animationMoveClass){
		var array = Object.keys(objectPrimary.store);
		if ( array.length > 0 ){
			//console.log(array);

			var group = new Group(styleClass,animationMoveClass, objectPrimary.store, objectPrimary.toolBox.paneObject,null,{
				x: objectPrimary.posX, y: objectPrimary.posY, width:objectPrimary.width, height: objectPrimary.height
			} );
			group.setBounds(objectPrimary.posX, objectPrimary.posY, objectPrimary.width,objectPrimary.height);
			objectPrimary.toolBox.div.appendChild( group.div );
			objectPrimary.clearStore();
        }
	 }

     /**
	  * Remove a PaneObject by the ID of the DIV - this method remove's the class animationSelected from the classList of the element
	  * @param element PaneObject with an hammerObject otherwise error 
	  */
	 static removeSelect(element){
		delete objectPrimary.store[element.hammerObject.element.id];
		element.hammerObject.element.classList.remove("animationSelected");
	 }
	 
	 /**
	  * Save an Item to the selected Shapes store - this method will add an animationSelected class to the classList of this Element
	  * @param element PaneObject with an hammerObject otherwise couldnt be saved
	  */
	 static selectItem(element){
		objectPrimary.store[element.hammerObject.element.id] = element;

		element.hammerObject.element.classList.add("animationSelected");
	 }
	 /**
	  * Get the amount of the selected shapes
	  * @return int Amount of selected shapes
	  */
	 static getSelectedShapes(){
		return Object.keys(objectPrimary.store).length;
	 }
	 
	 /**
	  * Toggle's an element selected/unselected 
	  * @param element PaneObject which you want to toggle
	  */
	 static toggle(element){
		 if( objectPrimary.store[element.hammerObject.element.id] != null ){
			
			try{
				objectPrimary.store[element.hammerObject.element.id].hammerObject.element.classList.contains("animationSelected") ? objectPrimary.store[element.hammerObject.element.id].hammerObject.element.classList.remove("animationSelected"):objectPrimary.store[element.hammerObject.element.id].hammerObject.element.classList.add("animationSelected");
			}catch(e){
				//console.log("no class found");
			}
			objectPrimary.store[element.hammerObject.element.id] = null;
		 }else{
			Selector.selectItem(element);
		 }
	 }
	 /**
	 */
	 static selectObjects(startX,startY,width,height){
		objectPrimary.store = [];
		let x = startX;
		let y = startY;

		let xWidth = parseInt(width);
		let yHeight = parseInt(height);
		
		var arrayObject = objectPrimary.toolBox.getPaneObjects();
 
		var array = Object.keys(arrayObject);
		var maxHeight = parseInt(y)+parseInt(yHeight);
		var maxWidth = x+xWidth;

		for ( let i=0;i<array.length;i++){
			if ( !Selector.findItem( arrayObject[array[i]],x,y, maxWidth,maxHeight )){
				if ( arrayObject[array[i]].children != null ){
					Selector.traverse(arrayObject[array[i]]);
				}
			}
		}
		return objectPrimary;
	 
	 }
	 /**
	  * Find the Items which are affected to this Selection Field
	  * @param {*} object 
	  * @param {*} x 
	  * @param {*} y 
	  * @param {*} maxWidth 
	  * @param {*} maxHeight 
	  */
	 static findItem(object,x,y, maxWidth,maxHeight){
		var objectX = parseInt( object.moveLogic.posX);
		var objectY = parseInt( object.moveLogic.posY);
	    // Todo chang formular for svg bbox
		if( objectX >= x &&	objectX+object.hammerObject.element.offsetWidth < (maxWidth) &&
			objectY >= y &&	objectY+(object.hammerObject.element.offsetHeight) < (maxHeight)){
			Selector.selectItem( object );
			return true;
		}else{
			Selector.removeSelect( object );
			return false;
		}	
	 }
	 
	 static traverse(object,offset){
		 if( object.children.length > offset ){
			
			if( object.children[offset].children != null ){
				
			}
		 }
	 }
	 
	 mouseMove(ev){ 
		var position = Selector.getPointPositionReletiveToPane(ev.clientX,ev.clientY);
		var vector={};
		vector.x = position.x*(1/objectPrimary.toolBox.paneObject.getScale());
		vector.y = position.y*(1/objectPrimary.toolBox.paneObject.getScale());
		
		
		if( objectPrimary.posX-vector.x<0 ){
			objectPrimary.width = (vector.x-objectPrimary.posX);
			objectPrimary.object.style.width = (vector.x-objectPrimary.posX)+"px";
			
		}else {
			objectPrimary.object.style.left = vector.x+"px";
			objectPrimary.width = (objectPrimary.posX-vector.x);
			objectPrimary.object.style.width = (objectPrimary.width)+"px";
		}
		if( objectPrimary.posY-vector.y<0 ){
			objectPrimary.height = (vector.y-objectPrimary.posY);
			objectPrimary.object.style.height = ( vector.y-objectPrimary.posY)+"px";
		}else {
			objectPrimary.object.style.top = vector.y+"px";
			
			objectPrimary.height = (objectPrimary.posY-vector.y);
			objectPrimary.object.style.height = (objectPrimary.posY-vector.y )+ "px";
		}
	 
	 }

	 disableSelector(){
		objectPrimary.activated = false;
		objectPrimary.toolBox.div.removeEventListener("pointermove",objectPrimary.mouseMove,true);
		objectPrimary.removeSelector();
	 }
	 
	 activateSelector(){ 
		objectPrimary.activated = true;
		objectPrimary.toolBox.div.addEventListener("pointermove",objectPrimary.mouseMove,true);
		objectPrimary.showSelector();
	 }

	 mouseDownEvent(ev){ 
		//console.log(ev);
		
 		objectPrimary.toolBox.stopPaneEvents();
		objectPrimary.activateSelector();
		var position = Selector.getPointPositionReletiveToPane(ev.clientX,ev.clientY);
		objectPrimary.posX = position.x*(1/objectPrimary.toolBox.paneObject.getScale());
		objectPrimary.posY = position.y*(1/objectPrimary.toolBox.paneObject.getScale());
	 
		objectPrimary.object.style.width = "0px";
		objectPrimary.object.style.height = "0px";		
		
		objectPrimary.object.style.left = objectPrimary.posX+"px";
		objectPrimary.object.style.top = objectPrimary.posY+"px";
	 }

	 /**
	  * 
	  * @param {WrappedHammerEvent} ev 
	  */
	 static getMousePositionRelativToPane(ev){
		return Selector.getPointPositionReletiveToPane(ev.srcEvent.clientX,ev.srcEvent.clientY);
	 }
	/**
	 * Calculate the relative Position of some Event - to the Active Pane
	 * @param {int} xArg The X Coord received by an Pointerevent/Mouseevent 
	 * @param {int} yArg The Y Coord received by an Pointerevent/Mouseevent
	 */
	 static getPointPositionReletiveToPane(xArg,yArg){
		var treeOffset = Selector.tree();
		var panePosition = objectPrimary.toolBox.paneObject.getBaseInformation();
		var xresult = (xArg - panePosition.x - treeOffset.x)/panePosition.scale;
		var yresult = (yArg - panePosition.y - treeOffset.y)/panePosition.scale;
		return { x: xresult,y:yresult, treeX: treeOffset.x, treeY: treeOffset.y };
	 }

	 mouseUpEvent(ev){

		var bounds = objectPrimary.object.getClientRects();

		console.log( objectPrimary.toolBox );
		
		objectPrimary.width= bounds[0].width;
		objectPrimary.height= bounds[0].height;

		objectPrimary.disableSelector(); 
	    Selector.selectObjects(objectPrimary.posX,objectPrimary.posY,objectPrimary.width,objectPrimary.height);
		Selector.groupObjects("drawBoxItem","drawBoxItemAnimation");
		objectPrimary.disable();
	 }
	 
	 activate(){
		objectPrimary.toolBox.stopPaneEvents();
		objectPrimary.toolBox.div.removeEventListener("pointerdown",objectPrimary.removeSelected);
		objectPrimary.toolBox.div.addEventListener("pointerdown",objectPrimary.mouseDownEvent);
		objectPrimary.toolBox.div.addEventListener("pointerup",objectPrimary.mouseUpEvent);
	 }
	 
	 disable(){
		objectPrimary.toolBox.div.removeEventListener("pointerdown",objectPrimary.mouseDownEvent);
		objectPrimary.toolBox.div.removeEventListener("pointerup",objectPrimary.mouseUpEvent);
		objectPrimary.toolBox.startPaneEvents();
	 }

	 /**
	  * Calculate the Parent offsets 
	  * @returns { x,y }
	  */
	 static tree(){
		var left = 0;
		var top  =0;
		var ref = document.getElementById("drawBox").parentNode;
		while( ref != null && ref != document ){
			left += parseInt(ref.getClientRects()[0].left);
			top += parseInt(ref.getClientRects()[0].top);
			ref = ref.parentNode;
		}
		return { x: left, y: top};
	 }
 }