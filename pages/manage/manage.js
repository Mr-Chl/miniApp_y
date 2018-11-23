// pages/manage/manage.js
import { wxTools, parseTime } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_config: {  // 头部配置
      iconStyle: 'color:#fff',
      text: '管理',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: false,
    },
    carInfo:[],
  },

  onLoad: function (options) {
    // this.getCarList();
  },
  onShow(options){
    this.getCarList();
  },
  showDetaile: function (e) {
    let id = e.currentTarget.dataset.id;
    let carName = e.currentTarget.dataset.carname;
    let carBranch = e.currentTarget.dataset.carbranch;
    let all_kilometre = e.currentTarget.dataset.allkilometre;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/detaile/detaile?id=' + id + '&carName=' + carName + '&carBranch=' + carBranch + '&all_kilometre=' + all_kilometre,
    })
  },
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
    wx.showLoading({
      mask: true,
    })
    wxTools._get(url, {}, (res)=>{
      if (res.data.code == 200) {
         let data = res.data.data;
         let arr = [];
         for (let i=0; i< data.length;i++) {
           let _i = data[i];
               _i.new_date = _i.new_date ? parseTime(_i.new_date, '{yy}/{M}/{D} {H}:{i}') : '-';
               let g_num = _i.consumption;
            arr.push({
              ..._i,
              consumption: g_num,
            })
         }
         this.setData({
           carInfo:arr,
         });
         wx.hideLoading();
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
               setTimeout(()=>{
                _this.getCarList();
              },600)
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