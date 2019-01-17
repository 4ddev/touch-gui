/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let scaleRegEx = /(scale\(s*\d*.\d*\s*\))/;
class Pane{
	/** 
	 * Create an Empty Pane
	 * Also this function will create a Map 
	 */
	constructor( PaneObjectConfiguration ){
		this.div = PaneObjectConfiguration.e;
		this.paneObject = new PaneObject(PaneObjectConfiguration,this);
		this.startPaneEvents();	 
	}

	/**
	 * Get the Element id of this pane
	 */
	getElementId(){
		return this.div.id;
	}
	/**
	 * Set the Dimension of this Pane 
	 * @param {[x,y]} dimension 
	 */
	setDimension(dimension){
		this.paneObject.setDimension(dimension);
	}
	/**
	 * Get the Paper dimensions 
	 * The papersize is found by the element which was
	 *  configured in the @see PaneObjectConfiguration
	 * it will take the default rendered size, for fix value set the width 
	 * and height of your HTML - element 
	 * @return {int[] 0: x , 1: y} The Paperdimension x,y in words width and height
	 */
	getDimension(){
		return this.paneObject.getDimension();
	}
	/**
	 * Add something wrapped in a Div to this Pane
	 * @param {*} element The Domnode - this Node will not be cloned!
	 * @param {*} ctrlElement The Ctrl JSON Element - see ButtonElement
	 * @param {*} toolBar  The Toolbar pages - see Toolbar
	 * @param {true|false} resizer True - Resize Elements will be added to this element 
	 */
	addElement( PaneObjectConfiguration ){
		PaneObjectConfiguration.e.classList.add("drawBoxItem");
		var config = Object.assign({},PaneObjectConfiguration);
		let newObject = new PaneObject(PaneObjectConfiguration,this);
		 //console.log(config);
		newObject.setButtons(new ButtonContainer(config.buttons,newObject));
		newObject.setLongTap(config.events.longTap.bind(newObject));
		newObject.setToolBar( PaneObjectConfiguration.createToolBar.call(newObject) );
        newObject.setParents(this.paneObject);
		
        this.paneObject.addChildren(newObject);

		newObject.activateEvent();
	    //this.map.put(PaneObjectConfiguration.e.id,newObject);
		this.div.appendChild(config.e);
		//this.EventQueue.push(newObject);
		return newObject;
	}
	/***
	 * Remove this element from the stage when some stage is not more used 
	 */
	remove(){
		//console.log(this.div.parentNode,"REMOVE");
		this.div.parentNode.removeChildren(this.div);
	}
	/**
	 * Remove some paneObject from this stage 
	 * @param {ID} key String which definde the string you want to search for  
	 */
	removeObject( key ){
		map.remove(key);
	}
	/**
	 * Start Events of the Pane - active all Listeners 
	 */
	startPaneEvents(){
		this.paneObject.activateEvent();
	}
	/**
	 * Stop all Pane Events - disable all listeners 
	 */
	stopPaneEvents(){
		this.paneObject.disableEvent();
	}

	/**
	 * Get all Objects of this Pane 
	 */
    getMap(){
		return map;
	}
	/**
	 * Get the children of this Pane
	 */
	getPaneObjects(){
		return this.paneObject.getChildren();
	}
	/**
	 * Set the Scale of this Pane
	 * @param {int} scaleFactor 
	 */
	scale(scaleFactor){
		this.paneObject.pinchLogic.scalePinch = scaleFactor;
		this.setTransform(scaleFactor);
	}
	/**
	 * Set the transformation of this element 
	 * which can be used to change the element position 
	 * @param {*} scale 
	 */
	setTransform(scale){
		if (this.div.style.transform.search(scaleRegEx) > -1 ){
			this.div.style.transform = (this.div.style.transform.replace(scaleRegEx,"scale("+scale+")"));
		}
		else this.div.style.transform+= " scale("+scale+")";
	}
	/**
	 * Get the scale of the Pane 
	 */
	getScale(){
		return this.paneObject.pinchLogic.scalePinch;
	}
	/**
	 * Get the Calculated bounding box
	 */
	getRect(){
		return [this.div.offsetWidth,this.div.offsetHeight];
	}
	/**
	 * Show this stage  to the
	 */
	show(){
		this.div.style.visibility = "visible";
	}
	/**
	 * Hide this Stage from the Pance 
	 */
	hide(){
		this.div.style.visibility = "hidden";
	}
	getDOMElement(){
		return this.div;
	}
}
