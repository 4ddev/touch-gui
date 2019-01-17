/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class PaneParentObject{
    constructor ( options, rootPane ){
		this.hammerObject = new Hammer.Manager(options.e);
	 
		this.children = [];
		this.stopPropagation = options.active;
		this.customizer = new Customizer(this);
		if( rootPane == null  || rootPane.getElementId == null  || rootPane.getScale == null) throw new NotInitializedException("RootPane not initialized");
		
		this.rootPane = rootPane;
		// init the Dimension with 
		this.dimension = ToolsDrawBox.readDimension(options.e);
	
		this.moveLogic = new Move(options);
		this.moveLogic.restorePosition.call(this,this.moveLogic.posX,this.moveLogic.posY);
		
		this.pinchLogic = new Pinch(options);

		this.listener = [];
		options.hammerConfigurations.forEach(element => {
			if( element.eventType === "pan" ){
				this.listener.push({hammerType: new Hammer.Pan(element.options), type: element.eventType, eventHandler: this.moveLogic.movePosition.bind(this)});
			}
			else if ( element.eventType === "pinch" ){
				this.listener.push({ hammerType: new Hammer.Pinch(element.options),type: element.eventType, eventHandler: this.pinchLogic.pinch.bind(this)});
			}else if ( element.eventType === "tap") {
				this.listener.push({ hammerType: new Hammer.Tap(element.options),type: element.eventType, eventHandler: this.clickEvent.bind(this)});
			}
		});
		this.addHammerEvents();
		this.registerHammerEvents();
	}
	getDOMElement(){
		return this.hammerObject.element;
	}
	/**
	 * Add the Configuration Listener to this HammerObject 
	 */
	addHammerEvents(){
		this.listener.forEach(element =>{
			this.hammerObject.add(element.hammerType);
		})
	}
	/**
	 * Register some events as hammervents 
	 */
	registerHammerEvents(){
		this.listener.forEach(element =>{
			this.hammerObject.on(element.type,element.eventHandler);
		})
	}
	/**
	 * Unregister the Events - just remove the hammer Event Listeer 
	 */
	unregisterHammerEvents(){
		this.listener.forEach(element =>{
			this.hammerObject.on(element.type,element.eventHandler);
		})
	}
	/**
	 * 
	 */
	removeHammerEvents(){
		var el;
		while( (el=this.listener.pop()) != null ){
			this.hammerObject.remove(el.hammerType);
		}
	}
	removeAndDisableHammerEvents(){
		this.unregisterHammerEvents();
		this.removeHammerEvents();
	}

	setDimension(dimension){
		this.dimension = dimension;
	}
	/**
	 * Get the boundbox of this element should be called whenever you want to know the dimension 
	 */
	getDimension(){
		return this.dimension;
	}
	getElementId(){
		return this.hammerObject.element.id;
	}
	/**
	 * Disable the all Events referenced to this object
	 */
	disableEvent(){
		this.stopPropagation = true;
	}
 
    /** 
     * Activate all Events on this Object
     */
	activateEvent(){
		this.stopPropagation = false;
	}
    /**
	 * Get the Parents Array
     * @returns {*} PaneObject - master
     */
	getParents(){
		return this.master;
	}
    /**
	 * Set the Parent -
     * @param e PaneObject Some Object
     */
	setParents( e ){
		// Remove the PaneObject if it's already defined in another Parent
		if( this.master != null ) {
			this.master.removeChildren(this);
		}
		this.master = e;
	
		if ( this.master != null )this.master.addChildren(this);
	}
	
    /**
	 * Get the ID of the DOM Element
     * @returns {string}
     */
	getId(){
		return this.hammerObject.element.id;
	}


    /**
	 * Set the relation to its children
     * @param e An Array keeping pairs of key -> value
     */
	setChildren( e ){
		this.children = e;
	}

    /**
	 * Add a PaneObject to this children list
     * @param e A PaneObject
     */
	addChildren( e ){
		this.children[e.hammerObject.element.id] = e;
	}

    /**
	 * Get the Children of this PaneObject
     * @returns {Array}
     */
	getChildren(){
		return this.children;
	}

    /**
	 * Remove a Children from this children list - does not remove this node or some
	 * other elements of this paneobject
     * @param e ID of children - Dom node
	 * @return e if e was removed otherwise null
     */
	removeChildren(e){
		if ( e != null && e.hammerObject !=null ){
			delete this.children[e.hammerObject.element.id];
			return e;
		}
		return null;
    }

    setGroup( group ){
		this.group = group;
	}
	
    /**
	 * Activate the Parent Elements Eventlisteners
     * @param object PaneObject which does have a master !
     */
	static activateParents(object){
		if( object.master != null ){
			object.master.activateEvent();
			PaneParentObject.activateParents(object.master);
		}
	}
	/**
	 * 
	 * @param {object} The 
	 */
	static disableParents(object){
		if( object.master != null ){
			object.master.disableEvent();
			PaneParentObject.disableParents(object.master);
		}
	}

    /**
	 * Disable any Child-Element of this Object in the Pane-Tree
	 * This function does not disable the own object!
     * @param object The Object where to start from
     */
	static disableChildren( object ){
		if( object.children != null  ){
            var child = Object.keys(object.children);
            if( child.length > 0 ){
                for (var i = 0; i < child.length; i++) {
                	object.children[child[i]].disableEvent();
                    PaneParentObject.disableChildren(object.children[child[i]]);
                }
            }
        }
	}

    /**
	 * Activate any Child in this PaneObject Tree - start by this Object in the tree
	 * This function does not activate the Events of this Object!
     * @param object The Object where to start from
     */
	static activateChildren( object ){
        if( object.children == null  ){
            return;
        }else {
            var child = Object.keys(object.children);
            if( child.length > 0 ){
                for (var i = 0; i < child.length; i++) {
                    object.children[child[i]].activateEvent();
                    PaneParentObject.activateChildren(object.children[child[i]]);
                }
            }
        }
	}
}