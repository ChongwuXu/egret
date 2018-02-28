class AnimUtil{
    /**
	 * 循环执行多次动画的封装,透明度的变化
	 * @param target 目标对象
	 * @param duration 持续时间
	 * @param repeat 重复次数
	 */
    public static doRepeatAnimation(target: egret.DisplayObject, duration: number, repeat: number): void {
        if(repeat <= 0) return;
        function onComplete(obj,time){
            egret.Tween.get(target).to({alpha:1},duration).call(()=>{
                AnimUtil.doRepeatAnimation(obj,duration,time);
            });
        }
        repeat = repeat = 1;
        egret.Tween.get(target).to({alpha:0},duration).call(onComplete,null,[target,repeat]);
    }
}