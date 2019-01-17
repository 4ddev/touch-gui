/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
	Copyright 2018

 	Any copy or distribution is under restriction
    of its owner interests.

    DO NOT COPY - CHANGE - OR DISTRIBUTE - OR REDISTRIBUTE
    OR USE THIS SOFTWARE - CODE ELSEWHERE WITHOUT
    PERMISSION OF THE AUTHOR
 ****/

let drawBoxApplication = {
	offsetID: "paneObject",
	groupCtrlAction: null,
	groupStorage: null,
	offset:  0,
 
	Selector: null,
	toolBar: null,
	stage: null,
	/**
	 * Initialize the Startup of the Application 
	 * create the Toolbar's
	 * Start initialization process 
	 */
	initApplication: function(StageConfiguration,ShapePaneConfiguration, GroupConfiguration){
		// Initialize the Storage 
		this.storage = new StorageController();
		// Create the Group Storage
		this.groupStorage = [];
		// Initialize Default Group Settings - Toolbar and Buttons
		Group.initialize(GroupConfiguration,ButtonGroup.ctrlGroup(),this.groupStorage);
		Coordinates.initialize("vCord","hCord");
		
		// Create the Stage
		this.stage = new Stage(StageConfiguration);


		// Initialize the static ToolBar ---> All subroutines should be called static
        this.toolBar = new ToolBar(document.getElementById("drawBoxWrapper"),
            					   document.getElementById("toolBar"),
           							"listElementToolbar",
            						"toolBarContainer",
									"active");
	

		var ShapeContainerConfiguration = {
			shapes : document.getElementById("shapeContainer"),
			container: document.getElementById("listContainer"),
			listElement: "shapesElement",
			read: false,
			size: null
		}
 
		// Initialize the shapeContainer 
		this.shapeContainer = new ShapeContainer(ShapeContainerConfiguration,ShapePaneConfiguration);
		this.shapeContainer.setDefaultShapes();
		//console.log(this.stage);
		this.storage.store(this.stage);
	},

    displayStages: function(){

	},
	exportData: function(){
		
	},
	/**
	 * 
	 * @param {*} child 
	 * @param {*} isGroupElement 
	 * @param {*} ctrlFunctions {ctrlElement.animation,ctrlElement.click, ctrlElement.move}
	 * @param {*} toolBar 
	 * @paramm {[int,int]} start position x,y
	 * @param resizer {true | false} True - Resize Elements will be added to  this element
	 */
	add: function(PaneObjectConfiguration){
	    drawBoxApplication.offset++;
        PaneObjectConfiguration.e.id=drawBoxApplication.offsetID+drawBoxApplication.offset;
		return this.stage.getActivePane().addElement(PaneObjectConfiguration);
	},
	startSelect: function(){
		this.stage.Selector.activate();
	},
	getMap: function(){
		this.proVersion.getPaneObjects();
	},
	/**
	 * Undo some action should be could when an undo process will be make 
	 */
	undo: function(){
		EventQueue.undo();
	},
	/**
	 * Some callback function which make sense when you want to create some group
	 * @param {Actions: fn()} actions 
	 */
	setGroupAction: function(actions){
		this.groupCtrlAction = actions;
	},
	/**
	 * Scale the active pane - should be outside of this scale functions 
	 */
	scaleActivePane: function(ev){
		//console.log(this.stage);
		this.stage.scaleActivePane.call(this.stage, ev);
	},
	/**
	 * 
	 * @param {PaneObject} object  Paneobject where the scale should be extracted 
	 * @param {*} scale The Scale Factor - 
	 * @param {*} isFinal The Event is final or not
	 */
	setScalerPosition: function(object,scale,isFinal){
		
		let baseInfo = object.getBaseInformation.call(object);
		let realScale = baseInfo.scale *scale;

		if( realScale < ScaleArea.getMin() ){
			realScale = ScaleArea.getMin();
		} 
		else if (realScale > ScaleArea.getMax()){
			realScale= ScaleArea.getMax();
		}

		if ( !isFinal ){
			this.stage.getActivePane().setTransform.call(this.stage.getActivePane(),realScale);
		}else {
			this.stage.getActivePane().scale.call(this.stage.getActivePane(),realScale);
		}
		Coordinates.setViewBox( realScale );
		baseInfo.scale = realScale;
		Coordinates.move(baseInfo);
		this.stage.scaler.setPosition.call(this.stage.scaler,baseInfo.scale);
		
	},
	getActiveScale: function(){
		return this.stage.getActivePane().getScale();
	}
};
/**
 * Some undo function should  be called when an action wanna be reveresed
 */
function undo(){
	drawBoxApplication.undo();
}

/** Select some PaneObject does call the Selector which select some PanEObjects  */
function startSelect(){
    drawBoxApplication.startSelect();
}
/**
 * Export this voew of this Table which you want to exprot 
 */
function exportData(){
    return HammerExport.exportJson(drawBoxApplication.proVersion.getPaneObjects());
}
/** Initialize the startup when the doucment was loaded should be called when ever
 * this document is loaded 
 */
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
		let stageConfig = new StageConfiguration();
		let shapeContainerConfig = new ShapePaneConfiguration();
		drawBoxApplication.initApplication.call(drawBoxApplication,stageConfig,shapeContainerConfig);
    }
};