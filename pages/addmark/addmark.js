// pages/addmark/addmark.js
import { wxTools } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_config: {  // 头部配置
      iconStyle: 'color:#fff;',
      text: '添加纪录',
      textStyle: 'color:#fff;font-size:30rpx',
      showBackBtn: true,
    },
    id:'',
    //current_kilometre: '', // 当前里程
    all_kilometre: '', // 所有里程（表显示里程）
    gasoline_price: '',// 加油价格
    gasoline_num: '',// 加油量
  },

  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: id,
    })
  },
  saveMark() {
    if (this.data.id) {
      let url = '/mini_post_add_car_info';
      let params = {
        id: this.data.id,
        all_kilometre: this.data.all_kilometre,
        gasoline_price: this.data.gasoline_price,
        gasoline_num: this.data.gasoline_num,
      }
      let checks = this.checkParams(params)
      if (checks) {
        wx.showToast({
          icon:'none',
          title: checks,
        })
        return;
      }
      wxTools._post(url, params, (res)=>{
        if (res.data.code == 200) {
          wx.showToast({
              icon:'none',
              title:'添加成功'
          });
          setTimeout(()=>{
            wx.navigateBack()
          },300)
        } else {
          wx.showToast({
              icon:'none',
              title:res.data.data,
          });
        }
      })
    }
  },

  gasoline_numHandle(e) {
    this.setData({
      gasoline_num: e.detail.value,
    })
  },
  gasoline_priceHandle(e) {
    this.setData({
      gasoline_price: e.detail.value,
    })
  },
  all_kilometreHandle(e) {
    this.setData({
      all_kilometre: e.detail.value,
    })
  },
  checkParams(obj) {
    let str = '';
    switch(true) {
      case !obj.id :
      str = '数据错误'  
        break;
      case !obj.gasoline_num :
      str = '加油数量有误'  
        break;
      case !obj.gasoline_price :
      str = '加油金额有误'  
        break;
      case !obj.all_kilometre :
      str = '表显总里程有误'  
        break;
      default:
        str = '';
    }
    return str;
  }
})