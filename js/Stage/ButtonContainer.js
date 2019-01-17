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
let active = [];
class ButtonContainer{
	constructor(items,paneObject){
		//console.log(paneObject);
		//console.log(items);
		this.active = true;
		this.parent = paneObject.hammerObject.element;
		this.paneObject=paneObject;
		
		this.items = [];
		//console.log(items);
		if ( items != null ){
			this.addElement(items);
		}
			//console.log("CREATED");
	}

    /**
	 * Toggle the Button's
     * @param suppressOther True if all other should be disabled
     * @returns {boolean}
     */
	toggle(suppressOther){
		return this.active ?  this.show(suppressOther): this.hide();
	}

    /**
	 *
     * @returns {boolean} False if active
     */
	show(suppressOther){
		if ( suppressOther !== null ){
			console.log( active);
			for( var i =0;i<active.length;i++ ){
				active[i].hide();
			}
		}
		active.push(this);
		this.active = false;

		return false;
	}

    /**
	 *
     * @returns {boolean} True if hidding -
     */
	hide(){
		var a = active.indexOf(this);
		if( a > -1 ) active.splice(a,1);
		this.active = true;
		
		return true;
	}
	/**
	 * If the PaneObject does contain the ButtonElement 
	 * i.e. for new Buttons 
	 * @param {e: String (Property)} e 
	 */
	isIn(e){
		for ( var i =0;i<this.items.length;i++ ){
			if (  this.items[i].hasOwnProperty(e) ){
				return true;
			}
		}
		return false;
	}
	/**
	 * This element should add a SVG Rect to the PaneObject to handle inputEvents like 
	 * ButtonEvents - @see ButtonContainer 
	 * @param {@see - ButtonContainer } items
	 * @param {viewBox: SVG-ViewBox } Only The to X and Y are used - no stretching implemented
	 */
	addElement(items,viewBox){
		this.items.push.apply(this.items, Object.assign({},items));
		var array = Object.keys( items );
		
		for( var i =0;i<array.length;i++){
			var type = Object.keys(items[array[i]]);
			var item = items[array[i]][type];
			item.element = document.createElementNS("http://www.w3.org/2000/svg","rect");
 
			// Mozilla need Attribute's to get the Width and Height so you have to set width and height on the buttonelement
			item.element.setAttribute("width",item.width );
			item.element.setAttribute("height",item.height);
			var li = item.element;
			this.addListener(li,item.f.bind(this.paneObject));

			if( item.classList != null ){
				var classes = item.classList.split(" ");
				for( var z=0;z<classes.length;z++){
					li.classList.add(classes[z]);
				}
			}
			li.classList.add(item.icon);
			
			li.style.animation = item.animation;
			li.style.transform = item.transform;
			this.parent.appendChild(li);
		}
	}
	/**
	 * Some buttons you want to remove from this buttoncantainer 
	 * should be used when ever you want to delete some element from this buttoncontainer
	 * @param {HTML-DIV ELEMENT} items 
	 */
	removeElements(items){
		var array = Object.keys( items );
		
		for( var i =0;i<array.length;i++){
			var type = Object.keys(items[array[i]]);
			if ( items[array[i]].hasOwnProperty(type)){
				var item = items[array[i]][type];
				var li = item.element;
				this.removeListener(li,item.f); // remove the listener s
				this.parent.removeChild(li); // -> remove the SVG element 
			}
		}
		
	}
	/**
	 * Add an eventlistener to an object 
	 * @param {object:DOM Element} object 
	 * @param {func: function() - should be binded to an Object } func 
	 */
	addListener(object,func){
		object.addEventListener("mousedown",func,{passive: true});
		object.addEventListener("touchstart",func,{passive: true});
	}
	/**
	 * Add an specific Eventlistener to this element 
	 * @param {object: The DIV Object} object Some element you want to add an eventlsitener 
	 * @param {func: func()} func 
	 */
	removeListener(object,func){
		object.removeEventListener("mousedown",func,{passive:true});
		object.removeEventListener("touchend",func,{passive:true });
	}
	setPosition( x ,y ){
		this.ul.style.left = x;
		this.ul.style.top = y;
		this.ul.style.bottom = "unset";
		this.ul.style.right = "unset";
	}
	
	destroy(){
		//console.log("ELEMENT DESTROYED ");
		active = null;
		this.removeElements(this.items);
		this.parent = null;
		this.paneObject = null;
	}
}