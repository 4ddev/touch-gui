/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

class ResizeParent{
	 // CHECK IN CONTEXT TO REFERENCE!
	static checkIsInBox(object,reference, resize){
		
		if( reference != null   ){
		
			var x = 0;
			var y = 0;

 			var master = reference;
 			while( master != null && master.master != null ){
 				x += master.moveLogic.posX;
 				y += master.moveLogic.posY;
				master = master.master;
			}
			 
			var maxWidth =  reference.getDimension().width;
			var maxHeight =  reference.getDimension().height;
			
			var inX = false;
			var inY = false;

			if ( (object.x) <= (x+maxWidth) &&
			     object.x >= (x)  ){
                inX = true;
			}

			if( object.y >= (y) &&
				object.y <= (y+maxHeight) ){
				inY = true;
			}
			if ( reference.children != null && resize === true ) {
				//console.log(reference);
                ResizeParent.resize(reference.children,reference.dimension);
            }
			if ( inX && inY ) return true;
		}
		return false;
	}

    /**
	 * Start the Resize Process
     * @param map    The Pane Map
     */
	static resize(map,paperSize){
		ResizeParent.resizePane(ToolsDrawBox.findMax(map,0),paperSize);
	}
	/**
	 * Resize Root of an Object - given by [x,y] 
	 * @param {[]} arr x = PaneObject - the maximum in x , y = the maximum in y 
	 */
	static resizePane(arr,paperSize){
		//console.log(arr);
		if( arr != null && arr[0] != null && arr[0].master != null ){
			if( arr[0].master.master == null  ){
				ResizeParent.resizeX( arr[0].moveLogic.posX+arr[0].dimension.width , paperSize.width, arr[0].master, true, "vertical" );
			}
			if( arr[1].master.master == null  ){
				ResizeParent.resizeY( arr[1].moveLogic.posY+arr[1].dimension.height , paperSize.height, arr[1].master, true, "horizontal" );
			}
		}
		
	}
	/**
	 * Resize the X Coordinate 
	 * @param {} cord  Delta 0 -> x  
	 * @param {*} offset Page Size custom adjustment
	 * @param {*} object The Object to resize
	 * @param {*} createHr Create VR(*HR - style by css) lines in the drawbox
	 * @param {*} hrClass The class of the lines 
	 */
	static resizeX(cord,offset,object, createHr, hrClass){
		var args = 1;
		
		if ( cord <= 0 ) {

			args = -1;
	        cord = (-1*cord)+offset;
		}
		
		cord = Math.ceil(cord/offset)*offset;
		var amountLine = Math.ceil(cord/offset)-Math.ceil(object.dimension.width/offset);
		var newWidth = cord;

		if( createHr ){
			
			for (var i=object.dimension.width;amountLine>0;amountLine--,i+=offset ){
				
				var hr = document.createElementNS('http://www.w3.org/2000/svg','line');
				
				hr.classList.add("drawBoxItem");
				hr.classList.add("drawBoxPageIdent");
				hr.classList.add(hrClass);
				hr.setAttribute("x1",(args*i));
				hr.setAttribute("y1", "0");
				hr.setAttribute("x2",args*i);
				hr.setAttribute("y2","100%");
				
				// TODO REMOVE ALL PANE WITH MASTER 
				object.hammerObject.element.appendChild(hr);

			}
			var allLines = Array.prototype.slice.call(document.getElementsByClassName(hrClass));
	
			for( var i=0;i<allLines.length;i++ ){
				if( allLines[i].getAttribute("x1") >= newWidth ){
					object.hammerObject.element.removeChild(allLines[i]);
				}
			}
		}
		//console.log(newWidth);
		object.hammerObject.element.setAttributeNS( null,"width",newWidth );
	}
	/**
	 * Resize the Y Coordinate 
	 * @param {} cord  Delta 0 -> y 
	 * @param {*} offset Page Size custom adjustment
	 * @param {*} object The Object to resize
	 * @param {*} createHr Create HR lines in the drawbox
	 * @param {*} hrClass The class of the lines 
	 */
	static resizeY(cord,offset,object, createHr, hrClass){
		var args = 1;
		
		if ( cord <= 0 ) {

			args = -1;
	        cord = (-1*cord)+offset;
		}
		
		cord = Math.ceil(cord/offset)*offset;
		var amountLine = Math.ceil(cord/offset)-Math.ceil(object.dimension.height/offset);
		var newHeight = cord;

		if( createHr ){			
			for (var i=object.dimension.height;amountLine>0;amountLine--,i+=offset ){
				var hr = document.createElementNS('http://www.w3.org/2000/svg','line');
				
				hr.classList.add("drawBoxItem");
				hr.classList.add("drawBoxPageIdent");
				hr.classList.add(hrClass);
				hr.setAttribute("x1","0");
				hr.setAttribute("y1", (args*i));
				hr.setAttribute("x2","100%");
				hr.setAttribute("y2",(args*i));
				
				object.hammerObject.element.appendChild(hr);
			}
		
			var allLines = Array.prototype.slice.call(document.getElementsByClassName(hrClass));
 
			for( var i=0;i<allLines.length;i++ ){
				if( allLines[i].getAttribute("y1") >= newHeight ){
					object.hammerObject.element.removeChild(allLines[i]);
				}
			}
		}
		object.hammerObject.element.style.height = newHeight+"px";
	}
 
}