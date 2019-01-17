/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
let nodeH = null;
let nodeV = null;
// Place the SVG namespace in a variable to easily reference it.
let xmlns = "http://www.w3.org/2000/svg";
let vCords;
let hCords;

class Coordinates{
    static initialize(idV,idH){
        nodeH = document.getElementById(idH);
        nodeV = document.getElementById(idV);
        // TODO - GENERATE ITEMS AS NEEDED 
        var minX = -3000;
        var minY = -3000;
        var maxX = 3000; // nodeH.getBBox().width;
        var maxY = 3000; // nodeH.getBBox().height;
        hCords = Coordinates.addNumbers(nodeH,"x", minX,maxX, 100);

        Coordinates.setHAttribute({attr: "y", value: "15" });
        
        vCords = Coordinates.addNumbers(nodeV,"y",minY,maxY,100);

        nodeH.style.transformOrigin="0 0";
        nodeV.style.transformOrigin="0 0";
    }
    /**
     * Any Time called when the Pane is moved - does change the Target coordinates - should be changed 
     * to some generic function for calculation time 
     * @param {*} e 
     */
    static move(e){
        // TODO - ADD NEW TEXT NODES WHEN VIEWPORT IS OUT OF SCOPE
        for( var i =0,c=0;i<hCords.length||c<vCords.length;i++,c++ ){
           if ( i < hCords.length ) hCords[i].node.setAttributeNS(null,"x",hCords[i].attr+ (e.x*(1/e.scale)));
           if( c < vCords.length ) vCords[c].node.setAttributeNS(null,"y",vCords[c].attr+ (e.y*(1/e.scale)));
        } 
    }
    
    static addNumbers(node,attr,start,end,offset){
        var coords = [];
        for( var i =start;i<end;i+=offset){
            var txtElem = document.createElementNS(xmlns, "text");
            txtElem.setAttributeNS(null,attr,i);
            txtElem.setAttributeNS(null,"font-size",12);
            var helloTxt = document.createTextNode(i);
            txtElem.appendChild(helloTxt);
            node.appendChild(txtElem);
            coords.push({attr: i,node:txtElem });
        }
        
        return coords;
    }
    /**
    * Set the Vertical Positoin of this element should be declared when an element is added
    * to this vertical positon       
    * @param {*} o 
    */
    static setVAttribute(o){
        for( var i =0;i<vCords.length;i++ ){
            vCords[i].node.setAttributeNS(null,o.attr,o.value);
        }
    }
    /**
     * Set the horizontal osition of this element when the element if finished
     * @param {} o 
     */
    static setHAttribute(o){
        for( var i =0;i<hCords.length;i++ ){
            hCords[i].node.setAttributeNS(null,o.attr,o.value);
        }
    }
    /**
     * Set the viebox of this element which is calcaulate by the svg grahpic h 
     * @param {*} scale 
     */
    static setViewBox(scale){
        nodeH.style.transform = "scale("+scale+")";
        nodeV.style.transform = "scale("+scale+")";
        if ( 1/scale > 1 ){
            nodeV.setAttributeNS(null,"width",100*(1/scale)+"%");
            nodeH.setAttributeNS(null,"width",100*(1/scale)+"%");
        }
    }
}