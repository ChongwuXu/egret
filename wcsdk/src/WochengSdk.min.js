var WochengSDK = function () {
    function k() {
        var b = null;
        if (window.XMLHttpRequest) b = new XMLHttpRequest, b.overrideMimeType && b.overrideMimeType("text/xml"); else if (window.ActiveXObject) try {
            b = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (g) {
            try {
                b = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (c) {
            }
        }
        return b
    }

    function E(b, g, c) {
        var a = k();
        if (null != a) {
            d("\u68c0\u67e5\u9274\u6743\u7f51\u7edcurl:" + b);
            a.open("GET", b, g);
            var e = setTimeout(function () {
                a.abort()
            }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 ==
                    a.status) clearTimeout(e), d("[Get\u8bf7\u6c42\u6210\u529f]"), c(1); else if (r++, r == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"), c(0); else {
                    var f = b.replace(vacIP[r - 1], vacIP[r]);
                    d(f);
                    E(f, g, c)
                }
            };
            a.send()
        }
    }

    function F(b, g, c) {
        var a = k();
        if (null != a) {
            d("\u68c0\u67e5\u9274\u6743\u7f51\u7edcurl:" + b);
            a.open("GET", b, g);
            var e = setTimeout(function () {
                a.abort()
            }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 == a.status) clearTimeout(e), d("[Get\u8bf7\u6c42\u6210\u529f]"), c(1); else if (t++, t == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"),
                    c(0); else {
                    var f = b.replace(vacIP[t - 1], vacIP[t]);
                    d(f);
                    F(f, g, c)
                }
            };
            a.send()
        }
    }

    function G(b, g, c) {
        var a = k();
        if (null != a) {
            d("\u7528\u6237\u8ba2\u5355\u4fe1\u606f\u67e5\u8be2url:" + b);
            a.open("GET", b, g);
            var e = setTimeout(function () {
                a.abort()
            }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 == a.status) clearTimeout(e), d("[Get\u8bf7\u6c42\u6210\u529f]"), c(1, a.responseText); else if (u++, u == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"), c(0, '{"result":0,"errcode":"301"}'); else {
                    var f = b.replace(vacIP[u - 1],
                        vacIP[u]);
                    d(f);
                    G(f, g, c)
                }
            };
            a.send()
        }
    }

    function J(b, g, c) {
        var a = k();
        if (null != a) {
            d("\u9000\u8ba2url:" + b);
            a.open("POST", b, g);
            var e = setTimeout(function () {
                a.abort()
            }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 == a.status) clearTimeout(e), d("[POST\u8bf7\u6c42\u6210\u529f]"), c(1, a.responseText); else if (v++, v == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"), c(0, '{"result":0,"errcode":"301"}'); else {
                    var f = b.replace(vacIP[v - 1], vacIP[v]);
                    d(f);
                    w(f, g, c)
                }
            };
            a.send()
        }
    }

    function w(b, g, c) {
        var a = k();
        if (null !=
            a) {
            d("\u8ba2\u8d2d\u8bb0\u5f55\u67e5\u8be2url:" + b);
            a.open("GET", b, g);
            var e = setTimeout(function () {
                a.abort()
            }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 == a.status) clearTimeout(e), d("[Get\u8bf7\u6c42\u6210\u529f]"), c(1, a.responseText); else if (p++, p == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"), c(0, '{"result":0,"errcode":"301"}'); else {
                    var f = b.replace(vacIP[p - 1], vacIP[p]);
                    d(f);
                    w(f, g, c)
                }
            };
            a.send()
        }
    }

    function H(b, g, c) {
        var a = k();
        if (null != a) {
            d("\u9274\u6743url:" + b);
            a.open("GET", b, g);
            var e =
                setTimeout(function () {
                    a.abort()
                }, 1E4);
            a.onreadystatechange = function () {
                if (4 == a.readyState) if (200 == a.status) clearTimeout(e), d("[Get\u8bf7\u6c42\u6210\u529f]"), c(1, a.responseText); else if (q++, q == vacIP.length) d("ip\u5207\u6362\u7ed3\u675f"), c(0, '{"result":0,"errcode":"301"}'); else {
                    var f = b.replace(vacIP[q - 1], vacIP[q]);
                    d(f);
                    H(f, g, c)
                }
            };
            a.send()
        }
    }

    function z(b, g, c, a) {
        var e = k();
        if (null != e) {
            d("\u8ba1\u8d39url\uff1a" + b);
            e.open("POST", b, c);
            var f = setTimeout(function () {
                e.abort()
            }, 1E4);
            e.onreadystatechange = function () {
                d("\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42 xmlHttp.readyState:" +
                    e.readyState);
                d("\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42 xmlHttp.status:" + e.status);
                if (4 == e.readyState) if (200 == e.status) {
                    clearTimeout(f);
                    d("[\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42post\u8bf7\u6c42\u6210\u529f]");
                    var h = e.responseXML;
                    h.getElementsByTagName("flag") ? (x = h.getElementsByTagName("flag")[0].childNodes[0].nodeValue, d("\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42flag :" + x + "--URL:" + b), h = "http://payIP:9031/webpay/pay_options".replace(/payIP/, payIP[l]) + "?flag=" + x, window.location = h) : (l++, l == payIP.length ? (d("\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42 \u7b2c\u4e00\u4e8c\u6b65\u90fd\u5931\u8d25 A"),
                        a(0, "out of service")) : (h = b.replace(payIP[l - 1], payIP[l]), z(h, g, c, a)))
                } else l++, l == payIP.length ? (d("\u53d1\u9001\u8ba1\u8d39\u8bf7\u6c42 \u7b2c\u4e00\u4e8c\u6b65\u90fd\u5931\u8d25 B"), a(0, "out of service")) : (h = b.replace(payIP[l - 1], payIP[l]), z(h, g, c, a)); else a(0, "out of service")
            };
            e.send(g)
        }
    }

    function y(b, g, c, a) {
        var e = k();
        if (null != e) {
            e.open("POST", b, c);
            var f = setTimeout(function () {
                e.abort()
            }, 1E4);
            e.onreadystatechange = function () {
                if (4 == e.readyState) if (200 == e.status) {
                    clearTimeout(f);
                    d("[\u53d1\u9001\u9274\u6743\u8ba2\u5355\u8bf7\u6c42post\u8bf7\u6c42\u6210\u529f]");
                    var h = e.responseText;
                    d("OrderProduct\u54cd\u5e94\u6570\u636e\uff1a" + h);
                    h = eval("(" + h + ")");
                    1 == h.result ? (d("\u53d1\u9001\u9274\u6743\u8ba2\u5355\u8bf7\u6c42:" + h.result), d("\u53d1\u9001\u9274\u6743\u8ba2\u5355\u8bf7\u6c42:" + h.orderId), a(1, h.orderId)) : (n++, n == vacIP.length ? (d("ip\u5207\u6362\u7ed3\u675f"), a(0, "out of service")) : (h = b.replace(vacIP[n - 1], vacIP[n]), y(h, g, c, a)))
                } else n++, n == vacIP.length ? (d("ip\u5207\u6362\u7ed3\u675f"), a(0, "out of service")) : (h = b.replace(vacIP[n - 1], vacIP[n]), y(h, g, c, a))
            };
            e.send(g)
        }
    }

    var l = 0, q = 0, n = 0, p = 0, v = 0, u = 0, r = 0, t = 0, x, d = function (b) {
        console.log(b)
    };
    this.doOrderProduct = function (b, g, c, a, e, f, h, I, k, r, t, u, v, p, q, w, x, A, B, C, D, m) {
        b || (b = "unknown");
        g || (g = "unknown");
        c ? a ? e ? f ? h ? I ? (p || (p = "unknown"), q || (q = "unknown"), w || (w = "unknown"), x ? A ? B ? C ? D ? (d("payVersion:" + x), d("payChannelId:" + A), d("payAppId:" + B), d("payAppName:" + C), d("payUA:" + D), n = 0, b = "http://vacIP:12324/api/v1.0/buyOrder".replace(/vacIP/, vacIP[n]) + "/" + b + "/" + a + "/" + e + "/" + c + "/" + g + "/" + p + "/" + q + "?platform=" + w, d("\u4e0b\u8ba2\u5355:" + b), y(b, null,
            !0, function (a, b) {
                1 == a ? (a = '<?xml version="1.0" encoding="UTF-8"?><request><body><Version>' + x + "</Version><ChannelId>" + A + "</ChannelId><AppId>" + B + "</AppId><AppName>" + C + "</AppName><PropName>" + e + "</PropName><PropPrice>" + f + "</PropPrice><ExData>" + b + "</ExData><UA>" + D + "</UA><redirecturl>" + h + "</redirecturl><failurl>" + I + "</failurl><broadbandid>" + k + "</broadbandid><AccessType>url</AccessType><param1>" + c + "</param1><param2>" + r + "</param2><param3>" + t + "</param3><param4>" + u + "</param4><param5>" + v + "</param5></body></request>",
                    d("\u6253\u5f00\u8ba1\u8d39\u9875\u9762\u62fc\u63a5:" + a), l = 0, z("http://payIP:9031/webpay/pay".replace(/payIP/, payIP[l]), a, !0, m)) : m(0, "order Product error")
            })) : m(0, "payUA error") : m(0, "payAppName error") : m(0, "payAppId error") : m(0, "payChannelId error") : m(0, "payVersion error")) : m(0, "failUrl error") : m(0, "redirectUrl error") : m(0, "price error") : m(0, "contentName error") : m(0, "contentId error") : m(0, "customerId error")
    };
    this.doGetProducts = function (b, g, c, a, e, d) {
        if (b) if (g) {
            c || (c = ["unknown"]);
            a || (a = "unknown");
            e || (e = ["unknown"]);
            for (var h = "", f = 0; f < c.length; f++) h = f == c.length - 1 ? h + c[f] : h + (c[f] + "-");
            c = "";
            for (f = 0; f < e.length; f++) c = f == e.length - 1 ? c + e[f] : c + (e[f] + "-");
            q = 0;
            e = "http://vacIP:12324/api/v1.0/product".replace(/vacIP/, vacIP[q]);
            H(e + "?contentId=" + b + "&customerId=" + g + "&productId=" + h + "&userCode=" + a + "&productIdThird=" + c, !0, d)
        } else d(0, "customerId error"); else d(0, "contentId is empty")
    };
    this.doListUserOrders = function (b, d) {
        if (b) {
            p = 0;
            var c = "http://vacIP:12324/api/v1.0/order/".replace(/vacIP/, vacIP[p]);
            w(c + b, !0,
                d)
        } else d(0, "customerId error")
    };
    this.doUnsubscribe = function (b, d, c, a, e, f) {
        if (b) if (d || (d = "unknown"), c) {
            a || (a = "unknown");
            e || (e = "unknown");
            v = 0;
            var g = "http://vacIP:12324/api/v1.0/manager/unsubscribe/".replace(/vacIP/, vacIP[v]);
            J(g + b + "/" + c + "/" + d + "/" + a + "/" + e, !0, f)
        } else f(0, "contentId error"); else f(0, "customerId error")
    };
    this.doGetOrderInfo = function (b, d, c) {
        if (b) if (d) {
            u = 0;
            var a = "http://vacIP:12324/api/v1.0/order/user/".replace(/vacIP/, vacIP[u]);
            G(a + b + "/" + d, !0, c)
        } else c(0, "orderId error"); else c(0, "customerId error")
    };
    this.doZeroOrder = function (b, g, c, a, e, f, h, l, k) {
        b || (b = "unknown");
        g || (g = "unknown");
        c ? a ? e ? f ? (h || (h = "unknown"), l || (l = "unknown"), n = 0, b = "http://vacIP:12324/api/v1.0/buyOrder/zeroJL".replace(/vacIP/, vacIP[n]) + "/" + b + "/" + a + "/" + e + "/" + c + "/" + g + "/" + h + "/" + l, d("\u96f6\u5143\u8d2d:" + b), y(b, null, !0, function (a, b) {
            1 == a ? k(1, "order success") : k(0, "order Product error")
        })) : k(0, "price error") : k(0, "contentName error") : k(0, "contentId error") : k(0, "customerId error")
    };
    this.doCheckNetwork = function (b) {
        r = 0;
        E("http://vacIP:12324/api/v1.0/order/111".replace(/vacIP/,
            vacIP[r]), !0, function (g) {
            1 == g ? (t = 0, F("http://payIP:9031/webpay/serverMonitor".replace(/payIP/, payIP[t]), !0, function (c) {
                1 == c ? (d("\u7f51\u7edc\u6b63\u5e38"), b(1)) : b(0)
            })) : b(0)
        })
    }
};