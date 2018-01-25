class ProtoUtils {
	public constructor() {
	}
	public static load(url: any, options, callback = null):void{
		let root:any = new protobuf.Root();
		let queued:number = 0;
		let path:string;
		if(typeof options === "function"){
			callback = options;
			options = undefined;
		}
		let finish = (err,root) =>{
			if(!callback || queued) return;
			callback(err,root);
		}
		let process = (filename,source)=>{
			root.files.push(filename);
			let parsed = protobuf.parse(source,root,options),resolved;
			if(parsed.imports){
				queued += parsed.imports.length;
				for(let i = 0;i < parsed.imports.length;i++){
					if(resolved = root.resolvePath(path,parsed.imports[i])){
						let str:any = resolved.slice(resolved.lastIndexOf("/") + 1,resolved.length).replace(".","_");
						if(!RES.getRes(str)){
							RES.getResByUrl(resolved,function(soucre_:any){
								process(resolved,soucre_);
								--queued;
								finish(null,root);
							},this,RES.ResourceItem.TYPE_TEXT);
						}else{
							process(resolved,RES.getRes(str));
							--queued;
						}
					}
				}
			}
			if(parsed.weakImports){
				queued += parsed.weakImports.length;
				for(let i = 0; i < parsed.weakImports.length;i++){
					if(resolved = root.resolvePath(path,parsed.weakImports[i])){
						let str:any = resolved.slice(resolved.lastIndexOf("/")+1,resolved.length).replace(".","_");
						if(!RES.getRes(str)){
							RES.getResByUrl(resolved,function(soucre_:any){
								process(resolved,soucre_);
								--queued;
								finish(null,root);
							},this,RES.ResourceItem.TYPE_TEXT);
						}else{
							process(resolved,RES.getRes(str));
							--queued;
						}
					}
				}
			}
			finish(null,root);
		}
		if(typeof url === "string"){
			path = url.slice(0,url.lastIndexOf("/") + 1);
			RES.getResByUrl(url,function(soucre_:any){
				process(url,soucre_);
			},this,RES.ResourceItem.TYPE_TEXT);
		}else{
			for(let i = 0; i < url.length; i++){
				RES.getResByUrl(url[i],function(soucre_:any){
					let tempurl:string = url[i];
					path = tempurl.slice(0,tempurl.lastIndexOf("/") + 1);
					process(tempurl,soucre_);
				},this,RES.ResourceItem.TYPE_TEXT);
			}
		}
	}
}