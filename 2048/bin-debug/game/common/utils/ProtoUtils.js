var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtoUtils = (function () {
    function ProtoUtils() {
    }
    ProtoUtils.load = function (url, options, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var root = new protobuf.Root();
        var queued = 0;
        var path;
        if (typeof options === "function") {
            callback = options;
            options = undefined;
        }
        var finish = function (err, root) {
            if (!callback || queued)
                return;
            callback(err, root);
        };
        var process = function (filename, source) {
            root.files.push(filename);
            var parsed = protobuf.parse(source, root, options), resolved;
            if (parsed.imports) {
                queued += parsed.imports.length;
                for (var i = 0; i < parsed.imports.length; i++) {
                    if (resolved = root.resolvePath(path, parsed.imports[i])) {
                        var str = resolved.slice(resolved.lastIndexOf("/") + 1, resolved.length).replace(".", "_");
                        if (!RES.getRes(str)) {
                            RES.getResByUrl(resolved, function (soucre_) {
                                process(resolved, soucre_);
                                --queued;
                                finish(null, root);
                            }, _this, RES.ResourceItem.TYPE_TEXT);
                        }
                        else {
                            process(resolved, RES.getRes(str));
                            --queued;
                        }
                    }
                }
            }
            if (parsed.weakImports) {
                queued += parsed.weakImports.length;
                for (var i = 0; i < parsed.weakImports.length; i++) {
                    if (resolved = root.resolvePath(path, parsed.weakImports[i])) {
                        var str = resolved.slice(resolved.lastIndexOf("/") + 1, resolved.length).replace(".", "_");
                        if (!RES.getRes(str)) {
                            RES.getResByUrl(resolved, function (soucre_) {
                                process(resolved, soucre_);
                                --queued;
                                finish(null, root);
                            }, _this, RES.ResourceItem.TYPE_TEXT);
                        }
                        else {
                            process(resolved, RES.getRes(str));
                            --queued;
                        }
                    }
                }
            }
            finish(null, root);
        };
        if (typeof url === "string") {
            path = url.slice(0, url.lastIndexOf("/") + 1);
            RES.getResByUrl(url, function (soucre_) {
                process(url, soucre_);
            }, this, RES.ResourceItem.TYPE_TEXT);
        }
        else {
            var _loop_1 = function (i) {
                RES.getResByUrl(url[i], function (soucre_) {
                    var tempurl = url[i];
                    path = tempurl.slice(0, tempurl.lastIndexOf("/") + 1);
                    process(tempurl, soucre_);
                }, this_1, RES.ResourceItem.TYPE_TEXT);
            };
            var this_1 = this;
            for (var i = 0; i < url.length; i++) {
                _loop_1(i);
            }
        }
    };
    return ProtoUtils;
}());
__reflect(ProtoUtils.prototype, "ProtoUtils");
//# sourceMappingURL=ProtoUtils.js.map