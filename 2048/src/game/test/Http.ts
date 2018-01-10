// TypeScript file
class Http{
    public constructor(){

    }
    public HttpGet(url:string):void{
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url,egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
    public onGetComplete(event:egret.Event):void{
        let request = <egret.HttpRequest> event.currentTarget;
        console.log("get data:",request.response);

    }
    public onGetIOError(event:egret.IOErrorEvent):void{
        console.log("get error:" + event);
    }
    public onGetProgress(event:egret.ProgressEvent):void{
        console.log("get progress:" + Math.floor(100 * event.bytesLoaded/event.bytesTotal) + "%");
    }
}