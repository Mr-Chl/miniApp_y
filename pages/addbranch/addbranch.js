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
    pinpaiId:'',
    chexiId:'',
    typeId: '',
    carName: '',
    allM: '',
  },
  onLoad: function (options) {
    this.getCarListInfo({});
  },
  bindPickerChange(event) {
    var value = event.detail.value;
    var type =  event.currentTarget.dataset.type;
    switch (type){
      case '1' :
        this.setData({
          pinpaiId: value,
        })
        this.getCarListInfo({ pinpai: this.data.pinpai[this.data.pinpaiId].carId });
        break;
      case '2':
        this.setData({
          pinpaiId: this.data.pinpaiId,
          chexiId: value,
        })
        this.getCarListInfo({ pinpai: this.data.pinpai[this.data.pinpaiId].carId, chexi: this.data.chexi[this.data.chexiId].carId });
        break;
      case '3':
        this.setData({
          typeId: value,
        })
        break;
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
        if (params.chexi && params.pinpai) {
          _this.setData({
            'type': res.data.data,
          });
        } else if (params.pinpai) {
          _this.setData({
            'chexi': res.data.data,
            chexiId: '',
            typeId: '',
          });
        } else {
          _this.setData({
            'pinpai': res.data.data,
            chexiId:'',
            pinpaiId:'',
            typeId:'',
          })
        }
      }
    })
  },
  onaddBranch: function () {
    let carName = this.data.carName;
    let allM = this.data.allM;
    let url = '/mini_post_add_car';
    let text = '';
    let branch = this.data.pinpai[this.data.pinpaiId] && this.data.pinpai[this.data.pinpaiId].carName
    let chexi = this.data.chexi[this.data.chexiId] && this.data.chexi[this.data.chexiId].carName
    let type = this.data.type[this.data.typeId] && this.data.type[this.data.typeId].carName
    if (carName.length <= 1) {
      text = '车辆名称最少是两个字';
    } else if (!branch) {
      text = '选择汽车品牌';
    } else if (!chexi) {
      text = '选择汽车车系';
    } else if (!type) {
      text = '选择汽车车型';
    } 
    //else if (allM.length <= 1) {
    //   text = '表显总里程最少是两位数';
    // }
     else {
      wxTools._post(url, { allM: allM, carName: carName, carBranch: branch, carChexi: chexi, carType: type }, (res) => {
        if (res.data.code == 200) {
          wx.showToast({
            icon: 'none',
            title: res.data.data,
          });
          setTimeout(()=>{
            wx.switchTab({
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
    }
    wx.showToast({
      icon: 'none',
      title: text,
    });
  },
  onShow: function () {
  
  },
  nackNameHandle(e){
    this.setData({
      carName: e.detail.value
    })
  },
  allMoliHandle(e) {
    this.setData({
      allM: e.detail.value
    })
  },
})