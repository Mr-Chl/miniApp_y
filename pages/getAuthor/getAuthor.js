// pages/getAuthor/getAuthor.js
import { BASE_URL } from '../../config/config.js'
Page({
  data: {
      header_config:{
          iconStyle: 'color:#fff',
          text: '授权',
          textStyle: 'color:#333;font-size:30rpx;color:#fff',
          showBackBtn: false,
      },
      showAuther: false,
  },
  onLoad: function (options) {
    this.navigators();
  },
  onGotUserInfo: function (e) {
      let { encryptedData, iv, rawData, signature } = e.detail;
      if (iv) {
          if (true) { // 是否登陆过
              this.loginHandle({
                  encryptedData: encryptedData,
                  iv: iv
              });
          }
      } else {
          wx.showToast({
              icon: 'none',
              title: '您拒绝了授权！',
          })
      }
  },
  loginHandle(detail) {
      wx.login({
          success: (res) => {
              if (res.code) {
                  wx.request({//发起网络请求
                      url: BASE_URL + '/mini_post_login',
                      method: 'post',
                      data: {
                          code: res.code,
                          ...detail,
                      },
                      success(res) {
                          if (res.data.code == 200) {
                              wx.setStorageSync('token', res.data.data);
                              wx.showToast({
                                  image: '../../static/success2.png',
                                  title: '授权成功',
                              })
                              setTimeout(()=>{
                                  wx.navigateTo({
                                      url: '/pages/manage/manage',
                                  })
                              },500)
                          } else {
                              wx.showToast({
                                  icon: 'none',
                                  title: '授权失败！请重试',
                              })
                          }
                      },
                  })
              } else {
                  console.log('登录失败！' + res.errMsg)
              }
          },
      })
  },

  navigators() {
    let author = wx.getStorageSync('token');
    if (!author) {
        this.setData({
          showAuther: true,
        })
    } else {
        wx.redirectTo({
            url: '/pages/manage/manage',
        })
    }
  },
})