// pages/question/index.js
const app = getApp(),
    api = require("../../utils/api").API
Page({

    /**
     * 页面的初始数据
     */
    data: {
        process: 0,
        index: 0,
        questions: [{
                q1: "在生活、工作或人际关系上，\n我有消极的情绪",
                answer: -1,
            },
            {
                q1: "近段时间，我的这些\n感觉、状态更差了",
                answer: -1,
            },
            {
                q1: "我在工作或者学业上\n很难集中精力",
                answer: -1,
            },
            {
                q1: "入睡困难，半夜频繁醒来，\n每天都醒得很早而且再也无法入睡，这些睡眠问题已经持续一段时间了",
                answer: -1,
            },
            {
                q1: "我想理清楚自己的烦心事，\n或者倾诉出来",
                answer: -1,
            },
            {
                q1: "我做出的改变有效，我的感觉\n好一点，不当的行为也少了",
                answer: -1,
            },
            {
                q1: "我通过朋友或家人\n帮助我解决目前的困扰",
                answer: -1,
            },
        ],
        answers: ['没有', '很少', '有一些', '中等', '很多']
    },
    choose(e) {
        if (this.data.index == 7) return;
        let that = this,
            questions = this.data.questions,
            index = this.data.index,
            inx = e.currentTarget.dataset.inx
        questions[that.data.index].answer = inx
        this.setData({
            process: ((index + 1) / 7 * 100).toFixed(0),
            questions,
        })
        if (this.data.index == 6) {
            console.log(this.data.questions)
            let FormReturn = 0
            this.data.questions.map(item => {
                FormReturn += item.answer
            })
            let data = {
                FormQA: this.data.questions.map(item => this.data.answers[item.answer]),
                FormReturn,
                FormOpenID: app.globalData.FormOpenID
            }
            console.log(data)
            api.SubmitAssess(data).then(res => {
                if (res.data.code == 0) {
                    wx.navigateTo({
                        url: `/pages/result/index?FormReturn=${data.FormReturn}`,
                    })
                } else if (res.data.code == 1) {
                    wx.showToast({
                        title: res.data.message,
                        icon: "none"
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: `/pages/result/index?FormReturn=${data.FormReturn}`,
                        })
                    }, 1500)
                } else {
                    app.getAuthKey()
                }
            })
        };
        setTimeout(function () {
            that.setData({
                index: index + 1
            })
            getApp().mtj.trackEvent(`q${that.data.index}`, { pv: '',  });
        }, 500)
    },
    lastQuestion() {
        if (this.data.index == 0) return;
        let questions = this.data.questions,
            index = this.data.index
        questions[this.data.index - 1].answer = -1
        this.setData({
            questions,
            process: ((index - 1) / 7 * 100).toFixed(0),
            index: index - 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getApp().mtj.trackEvent('q1', {
            pv: '',
        });
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
    onShareAppMessage: function () {

    }
})