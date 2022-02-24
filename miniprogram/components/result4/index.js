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
                text1: "配合Saffronia抗emo软糖",
                text2: "每颗软糖含15毫克\nNGH-21™核心抗焦emo成份",
                text3: "日常嚼嚼，一口吃掉坏情绪"
            },
            {
                image: "../../images/suger.png",
                text1: "配合Saffronia抗emo软糖",
                text2: "每颗软糖含15毫克\nNGH-21™核心抗焦emo成份",
                text3: "日常嚼嚼，一口吃掉坏情绪"
            },
            {
                image: "../../images/suger3.png",
                text1: "配合Saffronia抗emo心心糖",
                text2: "每粒心心糖都是快乐因子\n含高达15毫克\nNGH-21™核心抗焦emo成份",
                text3: "赶走坏情绪，快乐做自己"
            },
            {
                image: "../../images/suger4.png",
                text1: "配合Saffronia抗emo抚压片",
                text2: "颗抚压片含15毫克\nNGH-21™核心抗焦emo成份",
                text3: "放松心情，香甜好睡眠"
            },
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hadleTap() {
            this.triggerEvent('myevent', {
                params: "show"
            }, {})
        },
        to() {
            wx.navigateToMiniProgram({
                appId: 'wxb2fd083e2c7046c5',
                path: 'packages/goods/detail/index?kdt_id=45329716&alias=2xmqlxt2193mszg&scene=1089&subKdtId=0&notQueryVoucher=1&banner_id=g.1478114810~GoodsSearch~1~w7J3zUea&slg=consumer-search%2CstandardModify%2CTUPN4EN86FhegtO1644995778260%2C889.893.545_326e085de4184223af68220d9ed25e91&is_share=1&shopAutoEnter=1&share_from=null&from_uuid=TUPN4EN86FhegtO1644995778260',
                envVersion: 'release', // 打开正式版
                success(res) {
                    // 打开成功
                },
                fail: function (err) {
                    console.log(err);
                }
            })
        },
        saveImg(e) {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: () => {
                                // 同意授权
                                this.saveImg1("../../images/Component4.png");
                            },
                            fail: (res) => {
                                console.log(res);
                            }
                        })
                    } else {
                        // 已经授权了
                        this.saveImg1("../../images/Component4.png");
                    }
                },
                fail: (res) => {
                    console.log(res);
                }
            })
        },
        saveImg1(url) {
            wx.getImageInfo({
                src: url,
                success: (res) => {
                    let path = res.path;
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                        success: (res) => {
                            console.log(res);
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