let activePane=null;
class Stage{
    /**
     * Create the 
     * @param {*} StageConfiguration 
     */
    constructor(StageConfiguration){
        
        this.StageConfiguration = StageConfiguration;
        // Remove the initial Pane
        this.StageConfiguration.wrapper.removeChild( StageConfiguration.e );
        
        this.stageTab = [];
        // Register the "Create New Pane" Element
        var paneRegister = document.getElementsByClassName("addPane");
        for( var i =0;i< paneRegister.length;i++ ){
            paneRegister[i].addEventListener("pointerup",this.createNewPane.bind(this,StageConfiguration));
        }

        // Create the Scale Element 
        var scaleConfig = new ScalePointerConfiguration();
        scaleConfig.e = document.getElementById("scalePane");
    
		this.scaler = new ScaleArea(this,new PaneObject(scaleConfig,{
           getScale: function(){
               return 1;
           },
           getElementId: function(){
               return scaleConfig.e.id;
           }
        }),scaleConfig,0.1,4);		

        // Register the Dom Elements which recognize the Events
		this.scaler.registerMinus(document.getElementsByClassName("scaleMinus"));
		this.scaler.registerPlus(document.getElementsByClassName("scalePlus"));
    }
    /**
     * Should return a Hash to identify the Stage in the Storage
     */
    getElementId(){
        return 1;
    }
    scalePane(res,scale){
		activePane.scale.call(activePane,scale);
		Coordinates.setViewBox( scale );
		Coordinates.move(activePane.paneObject.getBaseInformation.call(activePane.paneObject));
    }
    
	setScalerPosition(scale,isFinal){
		
		var baseInfo = activePane.paneObject.getBaseInformation.call(activePane.paneObject);
		var realScale = baseInfo.scale *scale;

		if( realScale < ScaleArea.getMin() ){
			realScale = ScaleArea.getMin();
		} 
		else if (realScale > ScaleArea.getMax()){
			realScale= ScaleArea.getMax();
		}

		if ( !isFinal ){
			this.pane.setTransform.call(this.pane,realScale);
		}else {
			this.pane.scale.call(this.pane,realScale);
		}
		Coordinates.setViewBox( realScale );
		baseInfo.scale = realScale;
		Coordinates.move(baseInfo);
		this.scaler.setPosition.call(this.scaler,baseInfo.scale);
    }
    
	scaleTo(scale){
		this.scalePane(0,scale);
		this.scaler.setPosition.call(this.scaler,scale);
	}

	scaleUp(){
        if( activePane != null ){
            var info =activePane.paneObject.getBaseInformation.call(activePane.paneObject);
            this.scaleTo(info.scale+0.01,true);
        }
	}
	scaleDown(){
        if ( activePane != null ){
            var info = activePane.paneObject.getBaseInformation.call(activePane.paneObject);
            this.scaleTo(info.scale-0.01,true);
        }
    }

    scaleActivePane(ev){
        var range = ev.xBounds.max - ev.xBounds.min;
        var scales = ScaleArea.getMax() - ScaleArea.getMin();
        var result =( ( scales/range ) * ev.x)+ScaleArea.getMin();
        
        this.scalePane(ev,result);
    }
    getActivePane(){
        return activePane;
    }

    setPaneAsActive( pane ){
        if ( activePane != null ) {
          
            //console.log(activePane);
            this.StageConfiguration.wrapper.removeChild(activePane.div);
        
        }
        if( pane != null ){
            if ( this.Selector != null ){
                this.Selector.clearStore();
                this.Selector.disableSelector();
                this.Selector.disable();
            }
            this.Selector = new Selector(pane);
          
            activePane = pane;
            this.StageConfiguration.wrapper.appendChild(activePane.div);
           
        }
    }
    /**
     * 
     * @param {@see StageConfiguration} StageConfiguration Complete Description of the Stage
     */
    createNewPane(StageConfiguration){
        if( StageConfiguration.tab != null ){
            var tempConfig = Object.assign({},StageConfiguration);
            tempConfig.e = tempConfig.e.cloneNode(true);
            var newPane = new Pane(tempConfig);
          
            this.stageTab.push( new StageTab(this,newPane,StageConfiguration.tab) );
            this.setPaneAsActive(newPane);
        }
    }
    destroy(){
        this.stage = null;
        activePane = null;
    }
}