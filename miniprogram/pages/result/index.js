// pages/result/index.js
const app = getApp(),api = require("../../utils/api").API
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choosed: 1,
        showDialog: false,
        result:1,
        InviteList:[
            // {Avatar:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLqxHTeMX0qBmmvdUGe6UkjqJKLmFOzYxtWxY9LHLdXaXWo18YzicficENCfwSvicTkJZJKEwtGKPJw/132"},
            // {Avatar:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLqxHTeMX0qBmmvdUGe6UkjqJKLmFOzYxtWxY9LHLdXaXWo18YzicficENCfwSvicTkJZJKEwtGKPJw/132"},
        ],
        code:''
    },
    getInviteInfo(){
        let that = this
        api.InviteInfo().then(res=>{
            if(res.data.code==0){
                if(res.data.data.InviteList.length==2){
                    that.setData({showDialog:true,})
                }
                that.setData({
                    InviteList:res.data.data.InviteList
                })
                // console.log(that.data.InviteList)
            }
        })
    },
    myevent(e) {
        console.log(e.detail.params)
        if (e.detail.params == "show") {
            this.setData({
                showDialog: true
            })
            if(e.detail.type==1){
                getApp().mtj.trackEvent(`get_good1`, { click: '',  });
            }else if(e.detail.type==2){
                getApp().mtj.trackEvent(`get_good2`, { click: '',  });
            }
        }else{
            this.setData({
                showDialog: false
            })
        }
    },
    choose(e) {
        this.setData({
            choosed: e.currentTarget.dataset.index,
            showDialog:false
        })
        if(this.data.choosed == 2){
            getApp().mtj.trackEvent(`advice`, { click: '',  });
        }else{
            getApp().mtj.trackEvent(`advice`, { click: '',  });
        }
    },
    GetUserInfo(){
        let that = this
        api.GetUserInfo().then(res=>{
            if(res.data.code==0){
                if(res.data.data.RewardInfo.Code){
                    that.setData({
                        code:res.data.data.RewardInfo.Code
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        if(options.FormReturn<=5){
            this.setData({result:1})
        }else if(options.FormReturn>5&&options.FormReturn<=10){
            this.setData({result:2})
        }else if(options.FormReturn>10&&options.FormReturn<=16){
            this.setData({result:3})
        }else{
            this.setData({result:4})
        }
        getApp().mtj.trackEvent(`r${this.data.result}`, { pv: '',  });
        // console.log(options.code)
        // if(options.code!="null"){
        //     this.setData({
        //         code:options.code
        //     })
        // }
        // if(options.IsSubmitPersonalInfo=="true"){
        //     this.setData({
        //         showDialog:true,
        //     })
        // }
        this.getInviteInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.GetUserInfo()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        console.log(wx.getStorageSync('openId'))
        return {
            title:'我正在参与测评得奖品，你也来吧！',
            path:"pages/index/index?FormOpenID="+wx.getStorageSync('openId'),
            imageUrl:'../../images/20.jpg',
            success(res){
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail(err){
                console.log("转发失败:" + JSON.stringify(err));
            }
        }
    }
})