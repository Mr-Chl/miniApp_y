// pages/detaile/detaile.js
import { wxTools, parseTime } from '../../utils/util.js';
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
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
      all_kilometre: 0,
      gasoline_num: 0,
      date: '-',
      gasoline_price: 0,
      around: 0,
    },
    id:'1',
    carName:'默认',
    carBranch: '马自达',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id, carName, carBranch } = options;
    this.setData({
      id: id,
      carName: carName,
      carBranch: carBranch,
    });
  },
  getDetileInfo() {
    wx.showLoading();
    let url = '/mini_get_car_list_detaile';
    var date = [];
    var around = [];
    if (!this.data.id) { return;}
    wxTools._get(url, { id: this.data.id}, (res) => {
      if (res.data.code == 200 && res.data.data.length) {
        var dataList = res.data.data.reverse();
        for(var i = 0;i < dataList.length;i++){
            around.push(dataList[i].consumption || 0)
          date.push(dataList[i].new_date ? parseTime(dataList[i].new_date, '{yy}/{M}/{D}'): '-')
        }
        wx.hideLoading();
        this.statisticalData(dataList);
        this.created({
          date: date,
          around: around,
        });
      } else {
        wx.hideLoading();
        this.created({
          date: [0],
          around: [0],
        });
      }
    })
  },
  showRecordList() {
    wx.navigateTo({
      url:'/pages/recordList/recordList?id=' + this.data.id,
    })
  },
  addRecord(){
    wx.navigateTo({
      url: '/pages/addmark/addmark?id=' + this.data.id,
    })
  },
  onShow(){
    this.getDetileInfo();
  },
  statisticalData(data){
    if (!data.length) { return;}
    var all = {
      gasoline_num: 0,
      gasoline_price: 0,
    };
    var nums = 0;
    for(var i = 0;i < data.length;i++){
      var _i = data[i];
      all.gasoline_num += _i.gasoline_num;
      all.gasoline_price += _i.gasoline_price;
      nums += (_i.gasoline_num / _i.current_kilometre *100);
    }
    all.all_kilometre = data[data.length-1].all_kilometre;
    all.date = parseTime(data[0].new_date, '{yy}/{M}/{D}');
    all.around = (nums / data.length).toFixed(1);
    this.setData({
      cardetaileInfo: all,
    })
  },
  touchHandler: function (e) {
      lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
      lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
      lineChart.scrollEnd(e);
      lineChart.showToolTip(e, {
          format: function (item, category) {
              return '20' + category +': 平均油耗' + item.data 
          }
      });        
  },
  created: function (simulationData) {
    var windowWidth = wx.getStorageSync('env').sw;
    lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: simulationData.date,
        animation: true,
        background: '#1296db',
        series: [{
            name: '日期（年/月/日）',
            data: simulationData.around,
            color:"#fff",
            fontColor:'#fff',
            format: function (val, name) {
                return val + 'km/L';
            }
        }],
        xAxis: {
            disableGrid: false,
            fontColor:'#fff',
            gridColor: "#fff",
        },
        yAxis: {
            title: '油耗(L)',
            fontColor: '#fff',
            titleFontColor:"#fff",
            gridColor: "#fff",
            format: function (val) {
                return val;
            },
            min: 0,
        },
        width: windowWidth,
        height: 220,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
            lineStyle: 'curve',
            legendTextColor: '#fff'
        }
    });
  }
})
