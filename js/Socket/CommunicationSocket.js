var block = false; // INVERTED

class CommunicationSocket extends WebSocket{
    constructor(uri,message,error){
        super(uri);
        this.isOpen = false;
        this.packageInQueue = 0;

        this.onopen = function(){
            this.isOpen = true;
            //console.log("Connection open!");
        }

        this.onclose = function(){
            this.close = true;
            //console.log("Connection closed!");
        }

        this.onmessage = function(ev){
            this.packageInQueue--;
            if (message != null ) message(ev);
        }.bind(this);

        this.onerror = function(ev){
            if ( error != null ) error(ev);
        }
    
    }

    send(data){
        if ( this.isOpen ){
            this.packageInQueue++;
            super.send(data);
        }else{
            //console.log( " connection not open");
        }
        return this.onmessage;
    }
    receive(){

    }
    /**
     * 
     */
    
    close(){
        if( this.packageInQueue == 0 ){
            super.close();
        }else{
            //console.log("THERE ARE SOME PACKAGES IN QUEUE");
        }

    }
    
}

