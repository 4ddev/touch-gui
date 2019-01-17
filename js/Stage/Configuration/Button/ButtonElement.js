/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
 
/** 
 * Complete Description of a Button
 * @Description: The HTML Description of this element it will be generated 
 * with the definitions of the Json object
 * Scope of the function is the PaneObject
 * @type {{createGroup: {icon: string, classList: string, animation: string, transform: string, f: groupItem.createGroup.f}}}
 */
 var groupItem = { createGroup : {
        width: "50%",
        height: "50%",
        icon: "ctrl-circle",
        classList: "btn btn-warning",
        animation: "rota2 1s normal  forwards ease-in-out",
        transform: "rotate(-75deg) translate(100px)",
        f: function(){
            if ( Selector.isIn(this) != null ) {
                if ( Selector.getSelectedShapes() >= 2 ){
                    var min = ToolsDrawBox.findMin( Selector.getStorage(),0);
                    var max = ToolsDrawBox.findMax( Selector.getStorage(),0);
                    Selector.setBounds({
                        x: min[0].moveLogic.posX,
                        y: min[1].moveLogic.posY,
                        width:   (max[0].moveLogic.posX + max[0].hammerObject.element.offsetWidth)-min[0].moveLogic.posX,
                        height: max[1].moveLogic.posY + max[1].hammerObject.element.offsetHeight - min[0].moveLogic.posY});
                    Selector.groupObjects("drawBoxItem","drawBoxItemAnimation");
                }
            }
        }
    }};
 var selectItem = { createGroup : {
        width: "50%",
        height: "50%",
        icon: "ctrl-circle",
        classList: "btn btn-primary",
        animation: "rota3 1s normal  forwards ease-in-out",
        transform: "rotate(-100deg) translate(100px)",
        f: function(){
            if ( Selector.isIn(this) != null ) {
                if ( Selector.getSelectedShapes() >= 2 ){
                    var min = ToolsDrawBox.findMin( Selector.getStorage(),0);
                    var max = ToolsDrawBox.findMax( Selector.getStorage(),0);
                    Selector.setBounds({
                        x: min[0].moveLogic.posX,
                        y: min[1].moveLogic.posY,
                        width:  max[0].moveLogic.posX + max[0].hammerObject.element.offsetWidth,
                        height: max[1].moveLogic.posY + max[1].hammerObject.element.offsetHeight });
                    Selector.groupObjects("drawBoxItem","drawBoxItemAnimation");
                }
            }
        }
    }};
 var removeButtonElement = { "remove" : {
    width: "50%",
    height: "50%",
        icon: "ctrl-circle",
        classList: "btn btn-success",
        animation: "rota0 1s normal  forwards ease-in-out",
        transform: "rotate(-25deg) translate(100px)",
        f: function(){
            //console.log(this);
            this.remove.call(this);
        }
    }
};
 var selectButtonElement = { "select" : {
        width: "50%",
        height: "50%",
        icon: "ctrl-circle",
        classList: "btn btn-primary",
        animation: "rota1 1s normal  forwards ease-in-out",
        transform: "rotate(-50deg) translate(100px)",
        f: function(){
            Selector.toggle(this);
            //console.log(this);
            if ( this.objectControl.isIn("createGroup") ) return;  // If "createGroup" object is already defined don't add to ctrl Menu
            if ( this.objectControl != null  ){
                this.objectControl.addElement.call(this,[groupItem,selectItem])
            }
        }
    }
};
var restoreButtonElement = { "restore" : {
    width: "50%",
    height: "50%",
    icon: "ctrl-circle",
    classList: "btn btn-primary",
    animation: "rota1 1s normal  forwards ease-in-out",
    transform: "rotate(-50deg) translate(100px)",
    f: function(){
        Selector.toggle(this);
        if ( this.objectControl.isIn("createGroup") ) return;  // If "createGroup" object is already defined don't add to ctrl Menu
        if ( this.objectControl != null  ){
            this.restore.call(this);
        }
    }
}
};

var createConnection = { "connection" :{
    width: "50%",
    height: "50%",
    icon: "ctrl-circle",
    classList: "btn btn-primary",
    animation: "rota2 1s normal forwards ease-in-out",
    transform: "",
    f: function(){
        //console.log("Button",this);
        var source = null;
        //console.log(ConnectionVector.getElement());
        if ( (source=ConnectionVector.getElement()) != null ){
            if( ConnectionVector.getElement() !== this ){
                var vector = new ConnectionVector( this.rootPane.paneObject );
                vector.setSource.call(vector, source );
                vector.setTarget.call( vector,this );
                vector.draw.call(vector);
                vector.activeMove.call(vector);
                ConnectionVector.clearElement();
            }
        }else{
            ConnectionVector.setElement( this );
        }
    }

}}
var ctrlElementButton = [];  // Should have any initial button
ctrlElementButton.push(removeButtonElement);
ctrlElementButton.push(selectButtonElement);
ctrlElementButton.push(createConnection);


