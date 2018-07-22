// pages/detaile/detaile.js
import { wxTools } from '../../utils/util.js';

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
    cardetaileInfo:{
      allM: '-', // 总里程
      allG: '-', // 总加油量
      aroundG: '-', // 平均油价
      curM: '-', // 当前里程
      curG: '-', // 当前加油量
      aroundO: '-',  // 油耗
    },
    recordList:[],
    id:'',
    carName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id, carName } = options;
    this.setData({
      id: id || 1,
      carName: carName || '默认',
    })
  },
  getDetileInfo() {
    let url = '/mini_get_car_list_detaile';
    if (!this.data.id) { return;}
    wxTools._get(url, { id: this.data.id}, (res) => {
      if (res.data.code == 200 && res.data.data.length) {
        let GP = 0;// 平均油价
        let AM = 0;// 总里程
        let AG = 0;// 总加油量
        let RD = res.data.data;
        for (let i = 0; i < RD.length;i++) {
         let _i = res.data.data[i]
         GP += _i.gasoline_price;// 平均油价
         AM += _i.current_kilometre;// 总里程
         AG += _i.gasoline_num;// 总加油量
       }
        let cg = RD[RD.length - 1].gasoline_num;// 当前加油量
        let cm = RD[RD.length - 1].current_kilometre; // 当前里程
       this.setData({
         'cardetaileInfo.id': (RD[0].id), // 总里程
         'cardetaileInfo.allM': (RD[0].all_kilometre + AM), // 总里程
         'cardetaileInfo.allG': (AG), // 总加油量
         'cardetaileInfo.aroundG': (GP / RD.length).toFixed(2), // 平均油价
         'cardetaileInfo.curM': RD[RD.length - 1].current_kilometre, // 当前里程
         'cardetaileInfo.curG': RD[RD.length - 1].gasoline_num, // 当前加油量
         'cardetaileInfo.aroundO': (cg / cm * 100).toFixed(2),  // 油耗
         'cardetaileInfo.carName': this.data.carName,
         recordList: RD,
       })
      }
    })
  },
  showRecordList() {
    console.log(this.data.cardetaileInfo);
  },
  addRecord(){
    wx.navigateTo({
      url: '/pages/addmark/addmark?id=' + this.data.id,
    })
  },
  onShow(){
    this.getDetileInfo();
  }
})