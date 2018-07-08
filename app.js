//app.js
import {
    parseTime,
    wxTools
} from './utils/util.js' // 工具箱
import {
    BASE_URL
} from './config/config.js' // 接口域名   图片域名
App({
    onLaunch() { // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        this.getPhoneInfo(); //获取系统信息
    },
    //获取系统信息 存到本地
    getPhoneInfo() {
        wx.getSystemInfo({
            success: function(res) {
                let opt = {
                    "mb": res.brand, //手机品牌，wx.getSystemInfoSync().brand
                    "mm": res.model, //手机型号，wx.getSystemInfoSync().model
                    "sw": res.windowWidth, //屏幕宽度，wx.getSystemInfoSync().windowWidth
                    "sh": res.screenHeight, //屏幕高度，wx.getSystemInfoSync().screenHeight
                    "la": res.language, //用户语言，wx.getSystemInfoSync().language
                    "os": res.system, //系统及版本号，wx.getSystemInfoSync().system
                    "plt": res.platform, //用户平台,wx.getSystemInfoSync().platform
                    "wv": res.version, //微信版本号，wx.getSystemInfoSync().version
                    "sv": res.SDKVersion, //小程序sdk版本号，wx.getSystemInfoSync().SDKVersion
                    "net": '', //网络环境，wwx.getNetworkType().networkType
                    "appv": "1.0.1", //小程序版本号，由前端定义，建议每次发布或更新时修改 默认1.0.1
                };
                wx.getNetworkType({
                    success: function(res) {
                        opt.net = res.networkType; // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                        wx.setStorageSync("env", opt);
                    }
                })
            }
        })
    },
})