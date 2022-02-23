// components/result1/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

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

        drawing() {
            const query = wx.createSelectorQuery()
            query.select('#myCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas = res[0].node
                    const ctx = canvas.getContext('2d')

                    const dpr = wx.getSystemInfoSync().pixelRatio
                    canvas.width = res[0].width * dpr
                    canvas.height = res[0].height * dpr
                    ctx.scale(dpr, dpr)

                    ctx.fillRect(0, 0, 100, 100)
                })
        },

        longPressSaveImg(e) {
            let that = this
            let url = e.currentTarget.dataset.url;
            console.log(url);
            if (!wx.saveImageToPhotosAlbum) {
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })
                return;
            }
            // 检查用户授权
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        // 接口调用询问  
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success() {
                                that.saveImg(url);
                            },
                            fail() {
                                // 用户拒绝授权  
                                wx.showModal({
                                    title: '保存图片',
                                    content: '保存图片需要您授权',
                                    showCancel: true,
                                    confirmText: '确定',
                                    success(res) {
                                        if (res.confirm) {
                                            // 打开设置页面  
                                            wx.openSetting({
                                                success(res) {
                                                    if (res.authSetting['scope.writePhotosAlbum']) {
                                                        that.saveImg(url);
                                                    } else {
                                                        wx.showToast({
                                                            title: '授权失败!',
                                                            icon: "none"
                                                        });
                                                    }
                                                },
                                                fail(res) {
                                                    wx.showToast({
                                                        title: '授权失败!',
                                                        icon: "none"
                                                    });
                                                }
                                            });
                                        } else if (res.cancel) {
                                            wx.showToast({
                                                title: '您已取消授权!',
                                                icon: "none"
                                            });
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        that.saveImg(url)
                    }
                },
                fail(res) {
                    console.log(res);
                }
            })
        },
        saveImg(imageUrl) {
            wx.getImageInfo({
                src: imageUrl,
                success: (res) => {
                    let path = res.path;
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                        success: (res) => {
                            wx.showToast({
                                title: '保存成功'
                            });
                        },
                        fail: (res) => {
                            wx.showToast({
                                title: '您已取消保存',
                                icon: "none"
                            });
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