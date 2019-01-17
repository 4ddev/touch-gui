/**
 *  size = { width: width Of ShapeContainer, height: heightOf ShapeContainer 
/*           objectWidth: int (width of element ) , objectHeight: int ( height of element ) 
/*          }
 */
/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

let containerElements = 0;
let errorCounter =0;

class ShapeContainer{
    /**
     * 
     * @param {ShapeContainerConfigration} ShapeContainerConfiguration Create an ShapeContainer 
     * also this method will create an Swipeable and panable element which you can use as 
     * interactive shapecontainer 
     * @param {*} ShapePaneObjectConfiguration The configruation of every single element which you
     * want to add to this container  
     */
    constructor(ShapeContainerConfiguration ,ShapePaneObjectConfiguration ){
        
        if ( !(( ShapeContainerConfiguration.shapes!=null) && 
               ( ShapeContainerConfiguration.container!=null) && 
               ( ShapeContainerConfiguration.listElement!=null))  ){
            throw new NotInitializedException("Some of the elements are null or undefined");
        }
       
        let parent = ShapeContainerConfiguration.shapes.parentElement;
        this.container = ShapeContainerConfiguration.container.cloneNode(true);
        this.shapes = ShapeContainerConfiguration.shapes.cloneNode(true);
        parent.removeChild(ShapeContainerConfiguration.shapes);
        ShapePaneObjectConfiguration.e= this.shapes; // Set the shapes Object - can also be 
        
        // Create moveable Pane
        this.paneSwipe = new PaneObject(ShapePaneObjectConfiguration,{getScale:function(){
            return 1;
        },getElementId:function(){
            return ShapePaneObjectConfiguration.e.id;
        }});


        while (this.shapes.firstChild) {
            this.shapes.removeChild(this.shapes.firstChild);
        }
        this.shapes.appendChild(this.container); 

        parent.appendChild(this.shapes);
        this.paneSwipe.resizer = null;   
        this.paneSwipe.activateEvent.call(this.paneSwipe);
        this.listElement = ShapeContainerConfiguration.listElement;
        this.size= ShapeContainerConfiguration.size;
        
        if ( ShapeContainerConfiguration.read )this.readShapeContainerElements(this.container.getElementsByClassName(this.listElement),this.container,this.size);

        this.loadShapesFromNet.call(this,"Backend/ShapeLibaryLoader.php");
        
    }
/**
 * Add a shape to this container when ever you want to add an shape this shapecontainer 
 * call this method 
 * @param {Configuration} PaneObjectConfiguration The Configuration of this shape which you want to initialize 
 */
    addShape(PaneObjectConfiguration){
            
        let paneObject = new PaneObject(PaneObjectConfiguration,this.paneSwipe);
        paneObject.setParents(this.paneSwipe);

        paneObject.resizer = null;
        return paneObject;    
    }
    /**
     * Read some shapecontainer elements add the elements to this ShapeContainer 
     * @param {*} shapes 
     */
    readShapeContainerElements(shapes){
        let list = shapes;
        for( let i=0;i<list.length;i++ ){
            let temp = list[i].firstChild.nextSibling;
            let element = temp.cloneNode(true);
            this.readShapeSVG(element);
            element.id = "shapeContainerElement"+(++containerElements);
            element.style.position= "absolute";
            
            list[i].removeChild(temp);
            list[i].appendChild(element);
            let elementConfiguration = new ShapeObjectConfiguration();
            elementConfiguration.e = element;
            this.addShape(elementConfiguration);
        }
    }
    /**
     * Add the shape to this container 
     * @param {*} shape 
     */
    addShapeToContainer(shape){
        let listElementTemp =  document.createElement("li");
        listElementTemp.classList.add(this.listElement);
        let holder = document.createElement("div");
        listElementTemp.appendChild(holder);
        
        this.container.appendChild(listElementTemp);

        let element = shape.cloneNode(true);
        element.id = "shapeContainerElement"+(++containerElements);
        holder.style.position = "absolute";
        //holder.style.top = 40*containerElements+"px";
        this.readShapeSVG(element);
        holder.appendChild(element);
        let elementConfiguration = new ShapeObjectConfiguration();
        elementConfiguration.e = holder;

        this.addShape(elementConfiguration);

    }
    setDefaultShapes(){

    }
    /**
     * Read some svg as Shape SVG 
     * @param {*} reference 
     */
    readShapeSVG(reference){
        let svg = reference;
        let height = svg.getAttribute("height");
        let width = svg.getAttribute("width");
        svg.setAttribute("viewBox","0 0  "+width+" "+height);
        svg.setAttribute("height","40");
        svg.setAttribute("width","40");
    }
    /**
     * Load some sg from this url load the data and add the data to this shapecontainer
     * @param {*} url 
     */
    loadShapesFromNet( url ){

        errorCounter = 0;
        let success = function(result){
            try{
                let a = JSON.parse(result.responseText);
                let i = 0;
                let finish = 0;
                let symbol = function(svgGraph){
                    try{
                        this.addShapeToContainer(svgGraph.responseXML.getElementsByTagName("svg")[0]);
                        finish++;
                        if ( finish == a.length ) console.log(a.length+ " loaded");
                    }catch( e){
                        errorCounter++;
                    }
                }
                for( i =0;i<a.length;i++ ){
                    ToolsDrawBox.ajaxCall(a[i].file,symbol.bind(this),null);
                    
                }
                
               
            }catch( e ){
                errorCounter++;    
            }
        }
        let failure = function(result){
            errorCounter++;
        }
        ToolsDrawBox.ajaxCall(url,success.bind(this),null);
    }
}