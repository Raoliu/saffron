// components/dialog2/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        code: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        contents: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        to() {
            wx.navigateToMiniProgram({
                appId: 'wxb2fd083e2c7046c5',
                path: 'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Ddteqvik3lh%26kdt_id%3D45329716',
                envVersion: 'release', // 打开正式版
                success(res) {
                    // 打开成功
                    getApp().mtj.trackEvent(`shop2`, {
                        click: '',
                    });
                },
                fail: function (err) {
                    console.log(err);
                }
            })
        },
        copyText(e) {
            if (!e.currentTarget.dataset.text) return
            wx.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            wx.showToast({
                                title: '复制成功'
                            })
                            getApp().mtj.trackEvent(`copy`, {
                                click: '',
                            });
                        }
                    })
                }
            })
        },
        save() {
            wx.authorize({
                scope: 'scope.writePhotosAlbum',
                  complete() {
                    wx.getSetting({
                        success(res) {
                          console.log(res)
                          if (!res.authSetting['scope.writePhotosAlbum']) {
                            wx.openSetting({
                              success(res) {
                                 //拒绝授权后重新提示授权，并授权成功
                              }
                            })
                          }else{
                            wx.saveImageToPhotosAlbum({
                              filePath: '/images/joinCode.png',
                              success(result) {
                                console.log(result)
                                //已授权过可直接执行保存图片
                                wx.showToast({
                                    title: '保存图片成功',
                                })
                              },
                              fail(err){
                                  console.log(err)
                              }
                            })
                          }
                        }
                      })
                  }
              })
        },
        hadleTap() {
            getApp().mtj.trackEvent(`clsoe_emo`, {
                click: '',
            });
            this.triggerEvent('myevent', {
                params: "hide"
            }, {})
        }
    }
})