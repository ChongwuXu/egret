// TypeScript file
class UITest extends egret.DisplayObjectContainer{
    private pBar:eui.ProgressBar;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }
    private onAddedToStage(event:egret.Event):void{
        // this.initHSlider();
        // this.initProgressBar();
        this.initBution();
    }
    private initBution():void{
        let btn : eui.Button = new eui.Button();
        btn.x = 100;
        btn.y = 100;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.addChild(btn);
    }
    private onClick(event:egret.TouchEvent):void{
        var sdk:WochengSDK = new WochengSDK();
        sdk.doCheckNetwork((resultCode)=>{
            console.log("####:"+resultCode);
        })
    }
    private initProgressBar():void{
        this.pBar = new eui.ProgressBar();
        this.pBar.maximum = 210;
        this.pBar.minimum = 0;
        this.pBar.width = 200;
        this.pBar.height = 20;
        this.pBar.x = 200;
        this.pBar.y = 200;
        this.addChild(this.pBar);
        this.pBar.value = 42;
        let timer:egret.Timer = new egret.Timer(10,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        timer.start();
    }
    private timerHandler(event:egret.TimerEvent) :void{
        this.pBar.value +=1;
        if(this.pBar.value >= 210) {
            this.pBar.value = 0;
        }
    }
    private initHSlider():void{
        let hSlider : eui.HSlider = new eui.HSlider();
        hSlider.width = 200;
        hSlider.x = 20;
        hSlider.y = 20;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value  = 10;
        hSlider.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
        this.addChild(hSlider);
    }
    private changeHandler(event:eui.UIEvent):void{
        console.log(event.target.value);
    }
}