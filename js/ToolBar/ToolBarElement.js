/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018

   MIT License  
 ****/

class ToolBarElement{

    /**
     * Get the generated Toolbar Element
     * @returns {*}
     */

    
    static generateToolBarLayout(text){
        var element1 = document.getElementById("toolBarElementContainer").cloneNode(true);
        element1.id ="";
        
        var element2 = document.getElementById("selectBox").cloneNode(true);
        element2.id ="";

        var element3 = document.getElementById("toolBarElementContainer").cloneNode(true);
        element3.id ="";

        var element4 = document.getElementById("textfield").cloneNode(true);
        element4.getElementsByClassName("label-for-textfield")[0].innerText= "TESTDDDD";
        element4.id= "";

        var element5 = document.getElementById("textfield").cloneNode(true);
        element5.id="";

        element1.classList.remove("d-none");
        element2.classList.remove("d-none");
        element3.classList.remove("d-none");
        element4.classList.remove("d-none");
        element5.classList.remove("d-none");

        element3.appendChild(element4);
        element3.appendChild(element5);

        element1.appendChild(element2);

 
        return {pageText: text, content: [element1,element3]};
    }

    static generateToolBarElements(text){
        var element1 = document.getElementById("toolBarElementContainer").cloneNode(true);
        element1.id ="";

        var element2 = document.getElementById("selectBox").cloneNode(true);
        element2.id ="";

        var element3 = document.getElementById("toolBarElementContainer").cloneNode(true);
        element3.id ="";

        var element4 = document.getElementById("textfield").cloneNode(true);
        element4.id= "";

        var element5 = document.getElementById("textfield").cloneNode(true);
        element5.id="";
        element1.classList.remove("d-none");
        element2.classList.remove("d-none");
        element3.classList.remove("d-none");
        element4.classList.remove("d-none");
        element5.classList.remove("d-none");

        element3.appendChild(element4);
        element3.appendChild(element5);

        element1.appendChild(element2);

        element1.classList.remove("d-none");
        return {pageText: text, content: [element1,element3]};
    }
}
