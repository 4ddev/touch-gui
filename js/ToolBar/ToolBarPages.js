/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

class ToolBarPages{
    constructor(text,id){
        this.text = text;
        this.pages = [];
        this.id = id;
    }

    /**
     * @param o {pageText: text, content: []}
     */
    addPage(o){
        this.pages.push( o );
    }

    /**
     * Get all Pages of the generated Toolbar
     * @returns {*[]}
     */
    getPages(){
        return this.pages;
    }
    getId(){
        return this.id;
    }
}