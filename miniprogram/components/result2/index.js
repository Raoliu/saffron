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
        hadleTap(){
            this.triggerEvent('myevent',{params: "show"},{})
        },
        saveImg(e) {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: () => {
                                // 同意授权
                                this.saveImg1("../../images/codeImage.png");
                            },
                            fail: (res) => {
                                console.log(res);
                            }
                        })
                    } else {
                        // 已经授权了
                        this.saveImg1("../../images/codeImage.png");
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
