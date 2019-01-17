class StorageController {
    constructor(){
        this.storage = localStorage;
        this.read();
    }
    read(){
        //console.log(this.storage);
    }
    store(o){
        //console.log(o);
       // this.storage.setItem(o.getElementId(),JSON.stringify(o));
    }
}