//获取应用实例
Page({
    data: {
        header_config: {  // 头部配置
          iconStyle: '',
          text: 'swiper',
          textStyle: 'color:#fff;font-size:40rpx',
          showBackBtn: true,
        },
        current:0,
        nav_list:[
          {
            name: 1,
          },
          {
            name: 1,
          },
          {
            name: 1,
          },
          {
            name: 1,
          },
          {
            name: 1,
          }
        ],
    },
    onLoad: function () {
    },
    intervalChange(e) {
        console.log(e.detail.current);
        this.setData({
            current: e.detail.current
        })
    },
    getcurrent(e){
        console.log(e.currentTarget.dataset.index);
        this.setData({
            current: e.currentTarget.dataset.index
        })
    }
})
