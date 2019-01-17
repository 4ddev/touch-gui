/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

let undoStack = new Map();
let redoStack = new Map();

let listStack = [];
/**
 * This class shoud be used as Scheduler for the interactions of some user 
 * Should any Time be used when some action of an User Was made this 
 * This should be sthe last action of the ser was chi was made b
 */
class EventQueue{
 /**
  * The Undo funtion - called when ever the user want to revert his action 
  */
	static undo(){
		EventQueue.pop();
	}
/**
 * The logic implementation of the undo function 
 */
  	static pop(){
		if( listStack.length > 0 )
			EventQueue.restore(listStack.pop().key);
	}
	/**
	 * Push an ID and a funcction for storing in the eventqueue
	 * @param {DOM-ID} objectId 
	 * @param {*} func 
	 * @param {} options some Options as identifyer - 
	 */
	static push(objectId,func, options ){
		if ( undoStack.get(objectId) == null ) {
			undoStack.put(objectId,[func]);
		}else{
			undoStack.get(objectId).push(func); 
		}
		
		listStack.push({key:objectId,timeStamp: new Date().getTime(),option:options});
	}
/**
 * The revert function - can be used to revert any single element which was stored in this 
 * Queue 
 * @param {DOM-ID} objectId Some ID of the element which you want to revert 
 */
	static restore( objectId ){
		if ( undoStack.get(objectId) != null && undoStack.get(objectId).length > 0 ){
			 undoStack.get(objectId).pop()();
		}
	}
}