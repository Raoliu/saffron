// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choosed:true,
        sexIndex: 0,
        sexArray: ['男', '女'],
        ageIndex: 0,
        ageArray: ['0~17', '18~25', '26~35', '36~60', '60以上'],
        region: ['上海市', '上海市', '黄埔区'],
        customItem: '全部',
        form: {
            sex: '',
            age: '',
            area:'',
        },
    },
    //勾选框
    choose(){
        this.setData({choosed:!this.data.choosed})
    },
    //选择性别
    bindPickerChangeSex(e) {
        this.setData({
            sexIndex: e.detail.value,
            "form.sex": this.data.sexArray[e.detail.value]
        })
    },
    //选择年龄
    bindPickerChangeAge(e) {
        this.setData({
            ageIndex: e.detail.value,
            "form.age": this.data.ageArray[e.detail.value]
        })
    },
    //选择地域
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
        })
        this.setData({
            "form.area":`${this.data.region[0]} ${this.data.region[1]} ${this.data.region[2]}`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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