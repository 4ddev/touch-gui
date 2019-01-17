/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

let oldResize = null;
class ResizeElement{
	constructor(div){
		this.isClicked = false;
		this.div = div;
		this.elements = [];
		/*
		this.addDiv("cornerTopLeft",this.pointerDown );
		this.addDiv("cornerTopRight",this.pointerDown);
		this.addDiv("cornerBottomLeft",this.pointerDown);
		this.addDiv("cornerBottomRight",this.pointerDown);
		*/
	}
	/**
	 * Add the resizer div to this element which you want to add to this PaneOBject 
	 * @param {String} styleClass The StyleClass ou want to add to this element  
	 * @param {*} eventListener The Eventlistener you want to add to this element 
	 */
	addDiv( styleClass, eventListener ){
		var resizeElements = document.createElement("div");
		resizeElements.classList.add(styleClass);
		var hammerObject = new Hammer(resizeElements);
		hammerObject.on("pan",this.resize.bind(this));
		
		if (eventListener != null ){
			resizeElements.addEventListener("pointerdown",eventListener.bind(this));
		}
		this.elements.push({ element: resizeElements, hammer: hammerObject, eventListener: eventListener, clazz: this});
	}
	/** Remove this resizer element from this PanEOBjet  */
	removeDiv(){
		for( var object in this.elements ){
			//console.log(this.elements[object]);
			var j = this.elements[object];
			j.hammer.off("pan",j.clazz.resize.bind(j.clazz));
			j.element.removeEventListener("pointerdown",j.eventListener.bind(j.clazz));
			//console.log(j.element);
		}
	}
	/** The Interruot handler of this paneOBject should be initialized on any ResizeElement
	 * which can resize the PaneOBject 
	 */
	activateTapFunctions(){
		if ( oldResize !== this && oldResize != null ){
			oldResize.removeCtrlElements.call(oldResize);
			oldResize = null;
		}
		!this.isClicked ? this.addCtrlElements() :this.removeCtrlElements();
	}
	/**
	 * Add this div to this lement should be used for adding any single element to this div
	 * INitalizele the status of this element can be used to add the stylecals of this element 
	 */
	addCtrlElements(){
		this.div.classList.add("tapFunction");
		for( var i =0;i<this.elements.length;i++ ){
			this.div.appendChild(this.elements[i].element);
		}
		this.isClicked = true;
		oldResize = this;
	}
	/**
	 * Remove the ctrl lement should be used to remove any element of this 
	 * element 
	 */
	removeCtrlElements(){
		this.div.classList.remove("tapFunction");
		for( var i =0;i<this.elements.length;i++ ){
			try{
				this.div.removeChild(this.elements[i].element);
			}catch(e){
				// The list could be empty -
			}
		}
		this.isClicked = false;
	}
	/**
	 * Todo should be used to add any pointerdonw event when some interaction of the user was made 
	 * @param {*} ev 
	 */
	pointerDown(ev){
		// TODO
	}
	// TODO - Resize element 
	resize(ev){
		// TODO 
	}
	/**
	 * Destroy this elements - used to remove this elements from heap 
	 */
	destroy(){
		this.removeDiv();
		this.paneObject = null;
 
	}
}