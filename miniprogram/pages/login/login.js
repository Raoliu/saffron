// pages/login/login.js
const app = getApp(),
api = require("../../utils/api").API
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canClick:false,
        choosed:true,
        rules:{
            showMobileMsg:false,
            showAreaMsg:false,
            showBoxMsg:false,
        },
        sexIndex: 0,
        sexArray: ['男', '女'],
        ageIndex: 0,
        ageArray: ['18~25', '26~30', '31~35', '36以上'],
        region: ['上海市', '上海市', '黄埔区'],
        customItem: '全部',
        form: {
            Gender: '',
            Age: '',
            Phone:'',
            Province:'',
            City:'',
            Region:'',
        },
    },
    //获取手机号
    getMobilePhone(e){
        console.log(e.detail)
        let data = {
            iv:e.detail.iv,
            encryptedData:e.detail.encryptedData,
        },that = this
        api.PhoneNumber(data).then(res=>{
            console.log(res)
            if(res.data.code==0){
                that.setData({
                    "form.Phone":res.data.data,
                    canClick:true
                })
            }
        })
    },
    //勾选框
    choose(){
        this.setData({choosed:!this.data.choosed})
    },
    //选择性别
    bindPickerChangeSex(e) {
        this.setData({
            sexIndex: e.detail.value,
            "form.Gender": this.data.sexArray[e.detail.value]
        })
    },
    //选择年龄
    bindPickerChangeAge(e) {
        this.setData({
            ageIndex: e.detail.value,
            "form.Age": this.data.ageArray[e.detail.value]
        })
    },
    //选择地域
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
        })
        this.setData({
            "form.Province":this.data.region[0],
            "form.City":this.data.region[1],
            "form.Region":this.data.region[2],
        })
    },
    submit(){
        console.log(this.data.form)
        if(this.data.form.Phone==''){
            this.setData({
                "rules.showMobileMsg":true
            })
        }
        if(this.data.form.Province==''){
            this.setData({
                "rules.showAreaMsg":true
            })
        }
        if(this.data.choosed){
            this.setData({
                "rules.showBoxMsg":true
            })
        }
        if(this.data.form.Phone==''||this.data.choosed||this.data.form.Province=='') return;
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