/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

let offsetGroup = 0;

let initialParameter = null;
let groupConfiguration = null;
class Group{
    /**
	 * Initialize Default Parameter
     * @param ctrlObject  - See ButtonGroup!
     * @param storage     - Storage for Group Elements
     */
	static initialize(GroupConfiguration,ctrlObject,storage){

		groupConfiguration = GroupConfiguration;
		initialParameter = ctrlObject;
	}
    /**
	 * Create Group
     * @param styleClass Default style
     * @param animationMoveClass CSS Class when an animation is active
     * @param objects Objects which represents this group
     * @param parent Div of this element
	 * @param ctrlObject Container for the ObjectControlPanel and the Toolbar
     */
	constructor(styleClass, animationMoveClass, objects, parent,ctrlObject,bounds){
		this.parent = parent;
		this.array = Object.keys(objects);
		this.div = document.createElementNS("div");
		this.div.id = "drawBoxGroupId"+(offsetGroup++);
		this.div.classList.add( "drawBoxGroup" );
		this.div.classList.add( styleClass );
		this.animationMoveClass = animationMoveClass;
		//this.setBounds( bounds.x, bounds.y, bounds.width, bounds.height) ;

		if ( ctrlObject === null ) ctrlObject = initialParameter;

		var groupConf = new GroupObjectConfiguration(this.div,bounds);
		
        this.paneObject = new PaneObject(groupConf,Stage.getActivePane());
        ctrlObject.controlPanel = new ButtonContainer(this.div,ctrlObject.events,ctrlObject.className,this.paneObject);
        this.paneObject.objectControl = ctrlObject.controlPanel;

        this.paneObject.setToolBar(ctrlObject.toolBar.call(this));
		this.paneObject.setLongTap(ctrlObject.longTap.bind(this.paneObject));
		this.createGroup( objects );

	}

    /**
	 * Create a Group - change the UI Tree - set Group as parent of all Selected Nodes
	 * also set the groups Parent to the ROOT Parent of this Object you should be sure
	 * which parent - set Pane as parent in most cases!
     * @param objects Objects with all new PaneObjects refereed to this group
     * @returns {Group}
     */
	createGroup(objects){
		this.paneObject.setParents(this.parent);
        var childs = Object.keys(objects);
		for ( let i=0;i<this.array.length;i++){
			this.div.appendChild( objects[this.array[i]].hammerObject.element );
			this.paneObject.addChildren(objects[this.array[i]]);
			objects[this.array[i]].setParents(this.paneObject);
			Selector.removeSelect(objects[this.array[i]]);
		}
		PaneObject.disableChildren(this.paneObject);
		return this;
	}
	unGroup(object){
		// TODO UNGROUP
	}
 
	removeFromGroup( object ){
		
	}

    /**
	 * Lock all Child Elements of this Group
     */
	lockGroupElements(){
		PaneObject.disableChildren(this);
	}

    /**
	 * Unlock all Child Elements of this Group
     */
	unlockGroupElements(){
		PaneObject.activateChildren(this);
	}
    /**
	 * Set the bounds of this group - also this will set the div's position in the pane
     * @param x X Coordinate ( Integer! )
     * @param y Y Coordinate ( Integer! )
     * @param width Width of the new Group
     * @param height Height of the new Group
     */
	setBounds(x,y,width,height){
		this.div.style.left = x+"px";
		this.div.style.top = y+"px";
		this.div.style.height = height+"px";
		this.div.style.width = width+"px";
		this.paneObject.moveLogic.posX = x;
		this.paneObject.moveLogic.posY = y;
		this.paneObject.updateChildPosition();
	}

    /**
	 * Set the Toolbar of this Group
     * @param toolBar
     */
	setToolBar(toolBar){
		this.paneObject.setToolBar(toolBar);
	}

    /**
	 * Get the Toolbar of this Group
     */
    getToolBar(){
    	return this.paneObject.getToolBar();
	}

    /**
	 * Get the DOM-ID of this Group
     * @returns {string}
     */
	getId(){
    	return this.paneObject.hammerObject.element.id;
	}

    /**
	 * Add a CSS - Rule to this Group defined in the initialParameter.highlightStyle
     */
	dropable(){
		this.paneObject.hammerObject.element.classList.add( initialParameter.highlightStyle);
	}
	undropable(){
        this.paneObject.hammerObject.element.classList.remove( initialParameter.highlightStyle);
	}
}