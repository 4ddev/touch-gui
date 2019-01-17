/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class PaneObjectConfiguration extends ElementConfiguration{
    constructor(){
        super(paneElementConfiguration);
    }

    // @Override
    createToolBar(){
        // this => PaneObject
        var toolBarPage = new ToolBarPages("Preferences",this.getId()); // Add the Toolbar to the new PaneObject
        // Generate the ToolBar and all of its Elements
        toolBarPage.addPage(ToolBarElement.generateToolBarLayout("Layout"));
        toolBarPage.addPage(ToolBarElement.generateToolBarElements("Attributes"));
        return toolBarPage;
    }
}

let paneElementConfiguration = {	
    active: false,
 
    keyEventHandler: null,
    xyOff: [100,100],
    hammerConfigurations : [{eventType: "tap", options: {}},
                            { eventType: "pan", options: {direction: Hammer.DIRECTION_ALL, threshold: 1 }}], 

    resizer: true,
    resize: true,
    eventQueue: true,
    posX: 0,
    posY: 0,
    moveFunction: Move.moveBySVGAttr,
    events: paneObjectEvents,
    buttons: ctrlElementButton
}