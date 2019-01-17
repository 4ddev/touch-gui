let paneObjectEvents = {

    longTap: function(e){

        console.log( "POINTERUP");
    },
    animation: function(isFinite){
        isFinite ? this.hammerObject.element.classList.remove("drawBoxItemAnimation") : this.hammerObject.element.classList.add("drawBoxItemAnimation");
    },
    click: function(){
      
        if ( this.resizer !== null ) this.resizer.activateTapFunctions();
        // Show/Hide the Buttons - just toggle it
        if (!this.objectControl.toggle(true) ){
            // Do some stuff - Element Button state is deactive
        }else{
            //ToolBar.hide();
        }
        // Show always the Elements of this Toolbar
        console.log( this.getToolBar().getPages());
        ToolBar.clearAndShow(this.hammerObject.element.id ,this.getToolBar().getPages());

    },
    move: function(object){
        // TODO overthinking the recalculation in reference to ROOT-PANEOBJECT
        // MoveLogic.poxX/Y IS NOT UPDATED! - for exact position recalculate!
        drawBoxApplication.groupStorage.forEach(e => {
            ////console.log(object,e);
           if( ResizeParent.checkIsInBox(object,e.paneObject,false)){
               e.dropable();
           }else{
               e.undropable();
           }
        });
    }
}