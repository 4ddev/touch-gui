/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

class StageTab{
    constructor( stage,pane,tabTemplate, HTMLClass ){
        this.boundPane = pane;
        this.stage = stage;
        
        this.div = tabTemplate.cloneNode(true);
        tabTemplate.parentNode.insertBefore(this.div, tabTemplate.nextSibling); 
        this.addEventListener();
        this.div.id = "";
    }
    addEventListener(){
        this.div.addEventListener("pointerup",this.clickTab.bind(this));
    }
    
    removeEventListener(){
        this.div.removeEventListener("pointerup",this.clickTab.bind(this));
    }
    /**
     * Eventhandler for adding new Panes 
     */
    clickTab(){
        this.stage.setPaneAsActive(this.boundPane);
    }
    destroy(){
        this.div.parentNode.removeChild( this.div.parentNode, this.div);
        this.removeEventListener.call(this);
        this.stage =null;
        this.boundPane = null;
        this.div = null;
    }
}