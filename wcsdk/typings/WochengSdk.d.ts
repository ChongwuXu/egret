declare var vacIP:string;
declare var payIP:string;
declare class WochengSDK{
    doGetProducts(contentId:string, customerId:string, productIds:string[], userCode:string, productIdThirds:any,callBack:Function):void;
    doOrderProduct(boxId:string, productId:string, customerId:string, contentId:string, contentName:string, price:number, redirectUrl:string, failUrl:string, broadbandid:string, param2:string, param3:string, param4:string, param5:string, userCode:string, productIdThird:any, platform:string, payVersion:string, payChannelId:string, payAppId:string, payAppName:string, payUA:string,callBack:Function):void;
    doListUserOrders(customerId:string,callBack:Function):void;
    doUnsubscribe(customerId:string, productId:string, contentId:string, userCode:string, productIdThird:any,callBack:Function):void;
    doGetOrderInfo(customerId:string, orderId:string,callBack:Function):void;
    doZeroOrder(boxId:string, productId:string, customerId:string, contentId:string, contentName:string, price:number, userCode:string, productIdThird:any,callBack:Function):void;
    doCheckNetwork(callBack:Function):void;
}