class SceneManager extends Single{
    private _runningScene: Scene = null;
    private _scenesStack: Array<Scene> = [];
    private _nextScene: Scene = null;
    private _sendCleanupToScene: boolean;
	protected constructor() {
        super();
    }
    public static get Instance(): SceneManager{
        return this.getInstance();
    }
    public runWithScene(sceneName: string){
        console.assert(sceneName != null,"There is already a scene present.");
        console.assert(this._runningScene == null,"_runningScene should be null");
        this.push(sceneName);
    }
    public replaceScene(sceneName: string){
        console.assert(sceneName != null,"The scene should not be null.");
        if(this._runningScene == null){
            this.runWithScene(sceneName);
            return;
        }
        let cls = egret.getDefinitionByName(sceneName);
        let scene = new cls();
        if(scene == this._nextScene){
            return;
        }
        if(this._nextScene){
            if(this._nextScene.isRunning){
                this._nextScene.parent.removeChild(this._nextScene);
            }
            this._nextScene = null;
        }
        this._sendCleanupToScene = true;
        let len = this._scenesStack.length;
        this._scenesStack.splice(len - 1, 1, scene);
        this._nextScene = scene;
        this._setNextScene();
    }
    public push(sceneName: string){
        console.assert(sceneName != null,"The scene should not null.");
        this._sendCleanupToScene = false;
        let cls = egret.getDefinitionByName(sceneName);
        let scene = new cls();
        this._scenesStack.push(scene);
        this._nextScene = scene;
        this._setNextScene();
        
    }
    public pop(){
        console.assert(this._runningScene != null,"Running scene should not null.");
        this._scenesStack.pop();
        let len = this._scenesStack.length;
        if(len != 0){
            this._sendCleanupToScene = true;
            this._nextScene = this._scenesStack[len - 1];
            this._setNextScene();
        }else{
            //exit app
        }

    }
    private _setNextScene(){
        egret.MainContext.instance.stage.addChild(this._nextScene);
        if(this._runningScene){
            this._runningScene.onExitAnimation();
        }
        this._nextScene.onEnterAnimation();
        if(this._sendCleanupToScene && this._runningScene){
            this._runningScene.parent.removeChild(this._runningScene);
        }
        this._runningScene = this._nextScene;
        this._nextScene = null;
    }
    public get runningScene(){
        return this._runningScene;
    }
}