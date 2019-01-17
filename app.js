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

    onGotUserInfo: function (e) {
        let { encryptedData, iv, rawData, signature } = e.detail;
        if (iv) {
            if (true) { // 是否登陆过
                this.loginHandle({
                    encryptedData: encryptedData,
                    iv: iv,
                    rawData: rawData,
                    signature: signature,
                });
            }
        } else {
            wx.showToast({
                icon: 'none',
                title: '您拒绝了授权！',
            })
        }
    },
    loginHandle(detail) {
        wx.login({
            success: (res) => {
                if (res.code) {
                    wx.request({//发起网络请求
                        url: BASE_URL + '/mini_post_login',
                        method: 'post',
                        data: {
                            code: res.code,
                            ...detail,
                        },
                        success(res) {
                            if (res.data.code == 200) {
                                wx.setStorageSync('token', res.data.data.data);
                            } else {
                                wx.showToast({
                                    icon: 'none',
                                    title: '登陆失败',
                                })
                            }
                        },
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            },
        })
    },
})