/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let debug = false;
class ToolsDrawBox{
    static removeEmptyArrayFields( array ){
        var keys  = Object.keys(array);
        while( keys.length > 0 ){
            var key = keys.pop();
            if ( array[key] === "" ){
                //console.log(key);
                array.splice(key,1);
            }
        }
        return array;
    }
    static readDimension(element){
        if( element.getAttribute("height") != null && element.getAttribute("height") != null ){
            return { width: parseInt(element.getAttribute("width")), height: parseInt(element.getAttribute("height")) };
        }else{
            return  element.getBoundingClientRect();
        }
    }
    static findMin(  objects,offset){
        //console.log(objects);
        // TODO - BinarySearch - Note: There is at the moment no sorting - this must be implemented first - 
        var array = Object.keys(objects);
        var tempX = null;
        var tempY = null;
        // Ignore pane
        for ( var i =offset;i<array.length;i++ ){
            if ( tempX == null || (objects[array[i]].moveLogic.posX+objects[array[i]].dimension.width) < (tempX.moveLogic.posX+tempX.dimension.width) ){
                tempX = objects[array[i]];
            }			
            if ( tempY == null || (objects[array[i]].moveLogic.posY+objects[array[i]].dimension.height) < (tempY.moveLogic.posY+tempY.dimension.height) ){
                tempY = objects[array[i]];
            }
            
        }
        return [tempX,tempY];
    }

    static findMax(objects,offset){
        // TODO - BinarySearch - Note: There is at the moment no sorting - this must be implemented first - 
        var array= Object.keys(objects);
        
        var tempX = null;
        var tempY = null;
        //console.log(array,offset);
        // Ignore pane
        for ( var i =offset;i<array.length;i++ ){
            if ( tempX == null || (objects[array[i]].moveLogic.posX+objects[array[i]].dimension.width) > (tempX.moveLogic.posX+tempX.dimension.width) ){
                tempX = objects[array[i]];
            }			
            if ( tempY == null || (objects[array[i]].moveLogic.posY+objects[array[i]].dimension.height) > (tempY.moveLogic.posY+tempY.dimension.height) ){
                tempY = objects[array[i]];
            }
            
        }
        //console.log(tempX,tempY);
        return [tempX,tempY];
    }
    /**
     * EXPERIMENTEL 
     * @param {String} url 
     * @param {function(result)|null} success - first arg: the xhr 
     * @param {function(result)|null} failure - first arg: the xhr
     */
    static ajaxCall(url,success,failure){
        // Set up our HTTP request
        var xhr = new XMLHttpRequest();

        // Setup our listener to process completed requests
        xhr.onload = function () {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                if( success != null ) success(xhr);
                // What do when the request is successful
                if ( debug )console.log('URL loaded!', xhr);
            } else {
                if( failure != null ) failure();
                // What do when the request fails
                if ( debug )console.log('The request failed!');
            }
        };

        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('POST', url);
        xhr.send();
    }
    
}