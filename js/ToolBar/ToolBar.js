/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let div = null;
let pageTitle = null;
let pagesDOM = null;
let page = [];
let pagesContainer = null;
let activeCSS = null;
let activeElement = null;
let initTextLine = null;
let activeId = null;

let debugToolBar = false;
class ToolBar{
    constructor(parentObject,toolBar,pages,pageContainer, active){
        activeCSS = active;
        var newBar = toolBar.cloneNode(true);                                   // The Base ToolBar
        newBar.id = "activeBar";
        pagesDOM = newBar.getElementsByClassName(pages)[0].parentElement;       // The UL Element
        pageTitle = newBar.getElementsByClassName(pages)[0].cloneNode(true);    // The List Element
        parentObject.removeChild(toolBar);                                      // Remove the Template from the HTML
        div = newBar;
        parentObject.appendChild(newBar);                                       // Append the new Toolbar to the HTML
        ToolBar.clearDefault(pages);                                            // Remove the template li element
        pagesContainer = pageContainer;
        initTextLine = pages;
    }

    /**
     * Set the Pages of this Toolbar
     * @param o [] - Contains ToolBarElements
     */
    static addPages(o){
        console.log( o instanceof Array );
        if ( o instanceof Array ){
            for( let i=0;i<o.length;i++ ){
                if ( debugToolBar ) console.log(o[i]);
                ToolBar.addPage(o[i]);
            }
        }
    }
    /**
     * Remove the Default Template Data
     * @param className
     */
    static clearDefault(className){
        var list = Array.prototype.slice.call(div.getElementsByClassName(className));
        for ( var i=0;i<list.length;i++ ){
            pagesDOM.removeChild(list[i]);
        }
    }

    /**
     * Clear the Pages Container
     */
    static clearPages(){
        while( page.length > 0 ){
            pagesDOM.removeChild(page[0].pageHeader);
            page.splice(0,1);
        }
    }

    /**
     * Show the Toolbar
     */
    static show(){
        if( div !== null ){
            if( page.length > 0 ){
                page[0].pageHeader.classList.add(activeCSS);
                ToolBar.addContent(page[0].content);
                activeElement = page[0].pageHeader;
            }
            div.style.display ="block";
        }
    }

    /**
     * Remove all Data of the Toolbar
     * @param id Identify the active Pages
     * @param pages [ {pageText: text, content: []} ] Pages which you want to show up
     */
    static clearAndShow(id,pages){
        console.log( "TOOLAR " );
        console.log( id, pages,activeId  );
        if ( id === activeId ) return;
        activeId = id;
        console.log( "run" );
        ToolBar.clear(pagesContainer);
        ToolBar.clearPages(initTextLine);
        ToolBar.addPages(pages);
        ToolBar.show();
    }
    /**
     * Clears the Toolbar when the content is an element
     *  of the stored toolbar referenced to the id
     * @param {DOM ID} id 
     */
    static clearIfActive(id){
        if( id === activeId ){
            activeId = null;
            ToolBar.clear(pagesContainer);
            ToolBar.clearPages(initTextLine);
        }
    }
    /**
     * Hide the Toolbar
     */
    static hide(){
        if(div!==null){
            div.style.display="none";
        }
    }

    /**
     * Add a Page to this Toolbar
     * @param child { pageText: text, content: [] }
     */
    static addPage(child){
        console.log( child );
        if( page !== null && page !== undefined ){
            var pagination = pageTitle.cloneNode(true);
            pagination.innerText = child.pageText;
            pagination.id = "";
            var element = { pageHeader: pagination, content: child.content };
            pagination.addEventListener("click",ToolBar.showPage.bind(element));
            pagesDOM.appendChild(pagination);
            page.push({ pageHeader: pagination, content: child.content });
        }
    }

    /**
     * Called by the EventListener - should never be called outside of this Class!
     */
    static showPage(){
        ToolBar.clear(pagesContainer);
        if ( activeElement !== null ) activeElement.classList.remove(activeCSS);
        this.pageHeader.classList.add(activeCSS);
        activeElement = this.pageHeader;
        ToolBar.addContent(this.content);
    }
    /**
     * Add a DOM-Node to this Toolbar
     * @param child [ DOM-NODE ] or DOM-NODE
     */
    static addContent(child){
        if ( div != null ){    // Constructor should initialize at startup !
            //if ( debugToolBar ) //console.log(child);
            if ( child instanceof Array ){
                for( var i=0;i<child.length;i++ ){
                    div.appendChild(child[i]);
                }
            }else {
                div.appendChild(child);
            }
        }
    }

    /**
     * Remove all Child elements identified by className - should be a DOM-Class
     * @param className
     */
    static clear(className){
        var list = Array.prototype.slice.call(div.getElementsByClassName(className));
        for ( ;list.length>0; ){
            div.removeChild(list.pop());
        }
    }
}