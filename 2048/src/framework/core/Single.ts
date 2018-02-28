/**
 * 单例类
 */
class Single{
    private static _instance:any;
    protected constructor(){}
    protected static getInstance(){
        let clsName = egret.getQualifiedClassName(this);
        let cls = egret.getDefinitionByName(clsName);
        if(!this._instance){
            this._instance = new cls();
        }
        return this._instance;
    }
}