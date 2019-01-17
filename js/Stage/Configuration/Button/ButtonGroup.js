/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class ButtonGroup{
    static ctrlGroup(){
        return ctrlElementGroup;
    }
}

var removeGroup = {remove:{
        icon: "ctrlRectElement",
        classList: "btn btn-warning",
        animation: "splash 1s normal forwards ease-in-out",
        transform: "",
        f: function(){
            this.remove();
        }
    }
};

var selectGroup = { selectGroup : {
        icon: "ctrlRectElement",
        animation: "splash 1s normal forwards ease-in-out",
        transform: "",
        classList: "btn btn-primary",
        f:function(){
            Selector.toggle(this);
        }
    }
};

var disableGroupChildren ={ disableContent: {
        icon: "ctrlRectElement",
        animation: "splash 1s normal forwards ease-in-out",
        transform: "",
        classList: "btn btn-warning",
        f:function(){
            // this => PaneObject
            PaneObject.disableChildren(this);
        }
    }
};

var activateGroupChildren = { activateContent: {
        icon: "ctrlRectElement",
        animation: "splash 1s normal forwards ease-in-out",
        transform: "",
        classList: "btn btn-success",
        f:function(e){
            // this => PaneObject
            PaneObject.activateChildren(this);
        }
    }
};
var ctrlElementsGroup = [removeGroup,selectGroup,disableGroupChildren,activateGroupChildren];
/**
 * Default Parameter of a Group Element - change for own needs
 * @type {{events: Array, className: string, controlPanel: null, toolBar: (function(): ToolBarPages), longTap: ctrlElementGroup.longTap, animation: ctrlElementGroup.animation, click: ctrlElementGroup.click, move: ctrlElementGroup.move}}
 */
var ctrlElementGroup = {
    events: ctrlElementsGroup,
    className: "ctrlRect",
    controlPanel: null,
    highlightStyle: "highlightGroup",
    toolBar: function(){
        // this => Group
        var toolBarPage = new ToolBarPages("Preferences",this.getId()); // Add the Toolbar to the new PaneObject
        // Generate the ToolBar and all of its Elements
        toolBarPage.addPage(ToolBarElement.generateToolBarLayout("Gruppe"));
        toolBarPage.addPage(ToolBarElement.generateToolBarElements("Attributes"));
        return toolBarPage;
    },
    longTap: function (e) {
        // this => Group Object
    },
    animation: function(isFinite){
        isFinite ? function (){
            this.div.classList.remove(this.animationMoveClass);
          }.bind(this) : function(){
            this.div.classList.add(this.animationMoveClass);
        }.bind(this)
    },
    click: function(){
        // this => Group Object
        ToolBar.clearAndShow(this.getId() ,this.getToolBar().getPages());
        if( this.paneObject.resizer != null ) this.paneObject.resizer.activateTapFunctions();
        this.paneObject.objectControl.toggle();
    },
    move: function(){
        this.undropable();
    },
    width: "50%",
    height: "50%"
};
