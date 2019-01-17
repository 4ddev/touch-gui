/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class ScaleArea{
    constructor(stage,paneObject,configruation, minScale,maxScale){
        this.paneObject = paneObject;
        this.boundsX = configruation.xBounds;
        this.boundsY = configruation.yBounds;
        this.min = minScale;
        this.max = maxScale;
        this.minus = [];
        this.stage = stage;
    }
    /**
     * Same as ZOOM-OUT - does only add the eventlistener of the ZOOM-OUT Button
     * @param {*} domNodeArray 
     */
    registerMinus(domNodeArray){
        for( let i =0;i<domNodeArray.length;i++ ){
            this.minus.push( domNodeArray[i] );
            domNodeArray[i].addEventListener("click",this.stage.scaleDown.bind(this.stage));
        }
    }
    /**
     * Same as ZOOM-IN does only add the Eventlistener of the ZOOM-In Button
     * @param {*} domNodeArray 
     */
    registerPlus(domNodeArray){
        for( let i =0;i<domNodeArray.length;i++ ){
            this.minus.push( domNodeArray[i] );
            domNodeArray[i].addEventListener("click",this.stage.scaleUp.bind(this.stage));
        }
    }
    /**
     * Some static variable which defined the minimum box 
     */
    static getMin(){
        return 0.1;
    } 
    /**
     * The maximum shape size 
     */
    static getMax(){
        return 2;
    }  
    /**
     * Set the position of the Scale pointer 
     * @param {*} ev 
     */
    setPosition(ev){
        var range = this.boundsX.max - this.boundsX.min;
        var scales = ScaleArea.getMax() - ScaleArea.getMin();
        this.paneObject.moveLogic.restorePosition.call( this.paneObject, range*(ev-this.min)/scales, this.paneObject.moveLogic.posY ); 
    }
}