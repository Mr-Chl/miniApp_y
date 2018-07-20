// pages/detaile/detaile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_config: {  // 头部配置
      iconStyle: '',
      text: '油耗详情',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: true,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "header_config.text":options.id,
    })
  },
})