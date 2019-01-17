// pages/home/home.js
import { BASE_URL } from '../../config/config.js'
Page({
  data: {
      header_config: {  // 头部配置
      iconStyle: '',
      text: '记录列表',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: false,
    },
    phineInfo:[],
  },
  onLoad: function (options) {
    var env = wx.getStorageSync('env');
    var phineInfo = [
      {
        text: '手机品牌',
        content: env.mb,
      },
      {
        text: '手机型号',
        content: env.mm,
      },
      {
        text: '屏幕宽度',
        content: env.sw,
      },
      {
        text: '屏幕高度',
        content: env.sh,
      },
      {
        text: '用户语言',
        content: env.la,
      },
      {
        text: '系统及版本号',
        content: env.os,
      },
      {
        text: '微信版本号',
        content: env.wv,
      },
      {
        text: '小程序sdk版本号',
        content: env.sv,
      },
      {
        text: '网络环境',
        content: env.net,
      },
    ];
    this.setData({
      phineInfo: phineInfo,
    })
  },
})