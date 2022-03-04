// components/dialog2/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        code:{
            type:String
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
              path: 'packages/goods/detail/index?kdt_id=45329716&alias=2xmqlxt2193mszg&scene=1089&subKdtId=0&notQueryVoucher=1&banner_id=g.1478114810~GoodsSearch~1~w7J3zUea&slg=consumer-search%2CstandardModify%2CTUPN4EN86FhegtO1644995778260%2C889.893.545_326e085de4184223af68220d9ed25e91&is_share=1&shopAutoEnter=1&share_from=null&from_uuid=TUPN4EN86FhegtO1644995778260',
              envVersion: 'release', // 打开正式版
              success(res) {
                // 打开成功
                getApp().mtj.trackEvent(`shop2`, { click: '',  });
              },
              fail: function (err) {
                console.log(err);
              }
            })
          },
        copyText(e) {
            if(!e.currentTarget.dataset.text)return
            wx.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            wx.showToast({
                                title: '复制成功'
                            })
                            getApp().mtj.trackEvent(`copy`, { click: '',  });
                        }
                    })
                }
            })
        },
        hadleTap() {
            getApp().mtj.trackEvent(`clsoe_emo`, { click: '',  });
            this.triggerEvent('myevent', {
                params: "hide"
            }, {})
        }
    }
})