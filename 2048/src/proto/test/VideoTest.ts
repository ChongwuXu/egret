class VideoTest extends egret.DisplayObjectContainer{
    private video:egret.Video;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }
    private onAddedToStage(){
        this.video = new egret.Video();
        this.video.width = 640;
        this.video.height = 320;
        this.video.x = 0;
        this.video.y = 0;
        this.video.fullscreen = false;
        this.video.load("http://media.w3.org/2010/05/sintel/trailer.mp4");
        this.addChild(this.video);
        this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
    }
    private onLoad(event:egret.Event):void{
        let btnPlay:eui.Button = new eui.Button();
        btnPlay.label= "播放";
        btnPlay.x = this.video.x +20;
        btnPlay.y = this.video.y + this.video.height + 20;
        this.addChild(btnPlay);
        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        console.log(this.video.length);
    }
    private onLoadError(event:egret.Event):void{
        console.log("video load error");
    }
    private play(event:egret.TouchEvent):void{
        this.video.play();
    }
}