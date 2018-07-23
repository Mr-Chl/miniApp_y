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
    pinpai:[],
    chexi:[],
    type:[],
    value:0,
  },
  onLoad: function (options) {
    this.getCarListInfo({});
  },
  bindPickerChange(event) {
    var value = event.detail.value;
    var type =  event.currentTarget.dataset.type;
    this.setData({
      value: value,
    });
    if (type) {
      this.getCarListInfo({ pinpai: this.data.pinpai[value].carId, chexi: this.data.chexi[value].carId});
    }  else {
      this.getCarListInfo({ pinpai: this.data.pinpai[value].carId });
    }
  },
  getCarListInfo(data){
    let url = '/mini_get_car_branch';
    let _this = this;
    let params = {
      pinpai: data.pinpai || '',
      chexi: data.chexi || ''
    }
    wxTools._get(url, params, (res) => {
      if (res.data.code === 200) {
        if (params.pinpai) {
          _this.setData({
            'chexi': res.data.data,
          });
        } else if (params.chexi) {
          _this.setData({
            'type': res.data.data,
          });
        } else {
          _this.setData({
            'pinpai': res.data.data,
          })
        }
      }
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