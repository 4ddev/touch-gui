/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

class HammerExport{
	/**
	 * Export all DrawBox Data - to a JSON format
	 */ 
	static exportJson(objects){
		var array = Object.keys(objects);
		var json = "[ ";
		if ( array.length > 0 ){
			for ( let i=0;i<array.length-1;i++){
				json+= HammerExport.generateData(objects[array[i]])+", ";
			}
			json+=HammerExport.generateData(objects[array[array.length-1]]);
		}
		json+=" ]";
		return json;
	}
	
	static importJson(JSONString){
		return;
	}
	/**
	 * Generate the JSON Output
	 *
	 */
	static generateData(element){
		var cache = [];
		return JSON.stringify(element, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Duplicate reference found
					try {
						// If this value does not reference a parent it can be deduped
						return JSON.parse(JSON.stringify(value));
					} catch (error) {
						
						if ( value.element != null ){
							 
							return value.element.id;
						}else if( value.manager != null ){
							 
							return value.manager.element.id;
						}
						//console.log("ERROR");
						return;
					}
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
	}
}