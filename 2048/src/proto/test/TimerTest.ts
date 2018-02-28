class TimerTest extends egret.DisplayObjectContainer {
	private timeText:egret.TextField;
	private times:number;
	private startBtn:eui.Button;
	private resetBtn:eui.Button;
	private stopBtn:eui.Button;
	private timer:egret.Timer;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event):void{
		this.timeText = new egret.TextField();
		this.timeText.width = 200;
		this.timeText.height = 100;
		this.timeText.x = this.stage.width/2 - 100;
		this.timeText.y = this.stage.height/2 - 50;
		this.addChild(this.timeText);
		this.startBtn = new eui.Button();
		this.startBtn.label = "开始";
		this.startBtn.width = 100;
		this.startBtn.height = 50;
		this.startBtn.x = this.stage.width/3 - 50;
		this.startBtn.y = this.stage.height/3 * 2 - 25;
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startClick,this);
		this.addChild(this.startBtn);
		this.resetBtn = new eui.Button();
		this.resetBtn.label = "重置";
		this.resetBtn.width = 100;
		this.resetBtn.height = 50;
		this.resetBtn.x = this.stage.width/2 - 50;
		this.resetBtn.y = this.stage.height/3 * 2 -25;
		this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.resetClick,this);
		this.addChild(this.resetBtn);
		this.stopBtn = new eui.Button();
		this.stopBtn.label = "停止";
		this.stopBtn.width = 100;
		this.stopBtn.height = 50;
		this.stopBtn.x = this.stage.width/3 * 2 - 50;
		this.stopBtn.y = this.stage.height/3 * 2 -25;
		this.stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.stopClick,this);
		this.addChild(this.stopBtn);

		this.times = 0;
		this.timer = new egret.Timer(1000)
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
		
	}
	private timerFunc():void{
		this.times += 1
		this.timeText.text = "times:" + this.times;
	}
	private startClick(event:egret.TouchEvent):void{
		this.timer.start();
	}
	private resetClick(event:egret.TouchEvent):void{
		this.timer.reset();
	}
	private stopClick(event:egret.TouchEvent):void{
		this.timer.stop();
	}
	private timerComFunc():void{
		this.times = 0;
	}
}