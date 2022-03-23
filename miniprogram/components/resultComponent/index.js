// components/result1/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        status: {
            type: Number,
            defaultValue: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        result: [{
                image: "../../images/suger.png",
                text1: "软糖",
                text2: "每颗软糖含15毫克\n藏红花NGH-21™核心抗emo成份",
                text3: "随时随地抗焦虑，改善情绪"
            },
            {
                image: "../../images/suger.png",
                text1: "软糖",
                text2: "每颗软糖含15毫克\n藏红花NGH-21™核心抗emo成份",
                text3: "随时随地抗焦虑，改善情绪"
            },
            {
                image: "../../images/suger3.png",
                text1: "心心糖",
                text2: "每颗心心糖含藏红花核心抗emo成份+菊粉、脑肠轴3+1",
                text3: "深度改善焦虑型失眠，安心无依赖"
            },
            {
                image: "../../images/suger4.png",
                text1: "片",
                text2: "每颗抚压片含精纯藏红花提取物\n深度改善睡眠质量\n改善轻度&中度焦虑症",
                text3: "改善PMS经前综合症"
            },
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hadleTap() {
            this.triggerEvent('myevent', {
                params: "show",
                type:1
            }, {})
        },
        to() {
            wx.navigateToMiniProgram({
                appId: 'wxb2fd083e2c7046c5',
                path: 'packages/goods/detail/index?kdt_id=45329716&alias=2xmqlxt2193mszg&scene=1089&subKdtId=0&notQueryVoucher=1&banner_id=g.1478114810~GoodsSearch~1~w7J3zUea&slg=consumer-search%2CstandardModify%2CTUPN4EN86FhegtO1644995778260%2C889.893.545_326e085de4184223af68220d9ed25e91&is_share=1&shopAutoEnter=1&share_from=null&from_uuid=TUPN4EN86FhegtO1644995778260',
                envVersion: 'release', // 打开正式版
                success(res) {
                    // 打开成功
                    getApp().mtj.trackEvent(`shop1`, { click: '',  });
                },
                fail: function (err) {
                    console.log(err);
                }
            })
        },
        saveImg(e) {
            let url = e.currentTarget.dataset.url
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: () => {
                                // 同意授权
                                this.saveImg1(url);
                            },
                            fail: (res) => {
                                console.log(res);
                            }
                        })
                    } else {
                        // 已经授权了
                        this.saveImg1(url);
                    }
                },
                fail: (res) => {
                    console.log(res);
                }
            })
        },
        saveImg1(url) {
            getApp().mtj.trackEvent(`save`, { click: '',  });
            wx.getImageInfo({
                src: url,
                success: (res) => {
                    let path = res.path;
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                        success: (res) => {
                            console.log(res);
                            wx.showToast({
                              title: '保存成功',
                              type:"success"
                            })
                        },
                        fail: (res) => {
                            console.log(res);
                        }
                    })
                },
                fail: (res) => {
                    console.log(res);
                }
            })
        }
    }
})