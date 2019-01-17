/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/
class SVGLib{
    static createRecognizeableSVG( svg ){
        var eventElement = document.createElementNS("http://www.w3.org/2000/svg","rect");
        eventElement.setAttribute("width","100%");
        eventElement.setAttribute("height","100%");
        eventElement.setAttribute("style","fill: transparent");
        eventElement.setAttribute("class","pseudoElement"); // Pseudo element to simulate Chromes: pointer-events: bounding-box 
        svg.appendChild(eventElement);
    }
    static resizeTo(svg,size){
        //console.log(svg.getElementsByTagName("g"));
        //console.log(svg);
        return svg.getElementsByTagName("svg")[0];
    }
}