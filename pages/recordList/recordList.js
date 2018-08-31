// pages/recordList/recordList.js
import { wxTools, parseTime } from '../../utils/util.js';

Page({
  data: {
    header_config: {  // 头部配置
      iconStyle: '',
      text: '添加记录列表',
      textStyle: 'color:#fff;font-size:40rpx',
      showBackBtn: true,
    },
    recordList: [],
  },
  onLoad: function (options) {
    this.getRecordList(options.id);
  },

  getRecordList: function (id) {
    let url = '/mini_get_car_list_detaile';
    if (!id) { return;}
    wxTools._get(url, { id: id}, (res) => {
      if (res.data.code == 200) {
        var data = res.data.data;
        for (var i=0; i<data.length;i++) {
          data[i].date = parseTime(data[i].new_date, '{y}.{M}.{D}');
        }
          this.setData({
            recordList:data,
          })
      } else {
        wx.showToast({
          icon:'none',
          title:res.data.data
        })
      }
    })
  }
})