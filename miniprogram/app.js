// app.js
let api = require("./utils/api").API
App({
  onLaunch: function () {
    // this.getAuthKey()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
  },
  getAuthKey:function(){
    return new Promise((resolve,reject)=>{
      wx.login({
        success (res) {
          console.log(res)
          if (res.code) {
            //发起网络请求
            api.getOpenid({Code:res.code}).then(result=>{
              console.log(result)
              if(result.statusCode==200){
                wx.setStorageSync('openId', result.data.data.OpenID)
                wx.setStorageSync('sessionKey', result.data.data.SessionKey)
                let data = {status:200,msg:'success'}
                resolve(data)
              }else{
                console.log('用户登录失败')
                let err = {status:-1,msg:'登录失败'}
                reject(err);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    })
  },
});