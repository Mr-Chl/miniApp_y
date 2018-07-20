// pages/manage/manage.js
import { wxTools } from '../../utils/util.js';
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
    carInfo:[],
  },

  onLoad: function (options) {
    this.getCarList();
  },

  showDetaile: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addmark/addmark?id=' + id,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  addBranch: function () {
    if (this.data.carInfo.length >= 3) {
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

  getCarList(){
    let url = '/mini_get_car_list';
    wxTools._get(url, {}, (res)=>{
      if (res.data.code == 200) {
         let data = res.data.data;
         let arr = [];
         for (let i=0; i< data.length;i++) {
           let _i = data[i];
           let g_num = (_i.gasoline_num / _i.current_kilometre *100);
            arr.push({
              carName: _i.carName,
              currentM: _i.current_kilometre || 0,
              gasoline_num: _i.gasoline_num || 0,
              id: _i.id,
              consumption: (g_num || 0).toFixed(1),
            })
         }
         this.setData({
           carInfo:arr,
         })
      }
    })
  },
  deleteList: function (e) { 
    let id = e.currentTarget.dataset.id;
    let url = '/mini_post_delete_car';
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success(res) {
        if (res.confirm) {
          wxTools._post(url, {id:id}, (res)=>{
            if (res.data.code == 200) {
               wx.showToast({
                icon:'none',
                title:'删除成功！',
               });
               _this.getCarList();
            } else {
               wx.showToast({
                icon:'none',
                title:res.data.data,
               })
            }
          })
        }
      }
    })
  }
})