// index.js
const app = getApp()
const {
  envList
} = require('../../envList.js');
let api = require("../../utils/api").API

Page({
  data: {
    showDialog: false,
    scrollindex: 0, //当前页面的索引值
    totalnum: 2, //总共页面数
    starty: 0, //开始的位置x
    endy: 0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop: 0, //滑动下拉距离
  },
  onLoad() {
    api.GetUserInfo().then(res=>{
      console.log(res)
      if(res.data.data.IsSubmitPersonalInfo){
        wx.redirectTo({
          url: `/pages/result/index?FormReturn=${res.data.data.FormAssess.FormReturn}`,
        })
      }
    })
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log(res)
        wx.setStorageSync('userInfo', res.userInfo)
        let data = {
          iv: res.iv,
          encryptedData: res.encryptedData,
        }
        // api.GetUserInfo().then(res=>{
        //   console.log(res)
        // })
        api.UserInfo(data).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.data.code == 2000) {
            wx.showModal({
              content: "登录信息失效，点击确认登录",
              confirmText: "确认",
              success(res) {
                console.log(res)
                if(res.confirm){
                  app.getAuthKey().then(res=>{
                    console.log(res)
                    if(res.status==200){
                      wx.navigateTo({
                        url: '/pages/login/login',
                      })
                    }
                  })
                }
              }
            })
          }
        }).catch(err => {
          app.getAuthKey()
        })
      }
    })
  },
  scrollTouchstart: function (e) {
    let py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },
  scrollTouchmove: function (e) {
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    if (py - d.starty < 100 && py - d.starty > -100) {
      this.setData({
        margintop: py - d.starty
      })
    }
  },
  scrollTouchend: function (e) {
    let d = this.data;
    if (d.endy - d.starty > 100 && d.scrollindex > 0) {
      this.setData({
        scrollindex: d.scrollindex - 1
      })
    } else if (d.endy - d.starty < -100 && d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1
      })
    }
    this.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
  },
  more() {
    this.setData({
      showDialog: true
    })
  },
  close() {
    this.setData({
      showDialog: false
    })
  },
  
});