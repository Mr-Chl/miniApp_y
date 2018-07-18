// pages/addbranch/addbranch.js
import { wxTools } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_config: {  // 头部配置
      iconStyle: '',
      text: '添加车辆',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: true,
    },
    branchInput:'',
  },
  onLoad: function (options) {
  
  },
  branchInput(e){
    this.setData({
      branchInput: e.detail.value,
    })
  },
  onaddBranch: function () {
    let text = this.data.branchInput;
    let url = '/mini_post_add_car';
    if (text.length <= 1) {
      wx.showToast({
        icon: 'none',
        title: '车辆名称最少是两个字',
      });
      return ;
    }
    wxTools._post(url, { carName: text }, (res) => {
      if (res.data.code == 200) {
        wx.showToast({
          icon: 'none',
          title: res.data.data,
        });
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/manage/manage',
          })
        }, 300)
      } else {
        wx.showToast({
          icon:'none',
          title: res.data.data,
        })
      }
    })
  
  },
  onShow: function () {
  
  },
})