// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_config: {  // 头部配置
      iconStyle: '',
      text: '管理',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: false,
    },
    carInfo:{
      carName:'cx-5',
      carList:[{
        totleM: 2000,
        currentM:500,
        consumption: 4.2,
        id: 1001,
        },
        {
          totleM: 2000,
          currentM: 500,
          id: 1002,
          consumption: 4.2,
        }
      ]
    }
  },

  onLoad: function (options) {
  
  },

  showDetaile: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detaile/detaile?id=' + id,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  addBranch: function () {
    if (this.data.carInfo.carList.length >= 3) {
      wx.showToast({
        icon:'none',
        title: '最多只能添加三辆车',
      })
    } else {
      wx.navigateTo({
        url: '/pages/addbranch/addbranch',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})