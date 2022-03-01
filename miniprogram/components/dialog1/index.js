// components/dialog1/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        InviteList: {
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        Avatar: '',
        auth: true,
    },
    ready() {
        console.log("InviteList", this.properties.InviteList);
        if (this.properties.InviteList.length == 1) {
            this.setData({
                Avatar: this.properties.InviteList[0].Avatar
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        hadleTap() {
            getApp().mtj.trackEvent(`clsoe_emo`, { click: '',  });
            this.triggerEvent('myevent', {
                params: "hide"
            }, {})
        },
        invite() {
            let that = this
            wx.requestSubscribeMessage({
                tmplIds: ["0tMeVIhxXFSWTzY7G1MYB_3lzugQQqXa6qznDZZVmh8"],
                success(res) {
                    console.log(res)
                    getApp().mtj.trackEvent(`invite`, { click: '',  });
                    that.setData({
                        auth: false
                    })
                }
            })
        }
    }
})