const baseURL = 'https://www.unichichina.cn/'; 

export function request(method, url, data) {
    return new Promise(function (resolve, reject) {
        let header = {
            'content-type': 'application/json',
            // openId: wx.getStorageSync('openId') || '',
            // sessionKey: wx.getStorageSync('sessionKey') || '',
        };
        let sessionKey = wx.getStorageSync('sessionKey') || ''
        wx.request({
            url: baseURL + url + "?SessionKey=" + sessionKey,
            method: method,
            data: method === 'POST' ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功
                if (res.statusCode == 200) {
                    resolve(res);
                } else if (res.statusCode == 401) {
                    resolve(res);
                    // app.getAuthKey().then(()=>{
                    //     request(method, url, data)
                    // })
                } else if (res.statusCode == 400&&res.data=='User not registered') {
                    wx.showToast({
                        title: '您尚未注册',
                        icon: 'none'
                    })
                    wx.clearStorageSync()
                    setTimeout(function(){
                        wx.switchTab({
                            url: '/pages/me/index',
                          })
                    },1500)
                    
                } else {
                    // reject('运行时错误,请稍后再试');
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data,
                        icon: 'none'
                    })
                }
            },
            fail(err) {
                //请求失败
                console.log(err)
                reject(err)
            }
        })
    })
}
export function uploadFile(url, data) {
    return new Promise(function (resolve, reject) {
        let header = {
            // 'content-type':'multipart/form-data',
            openId: wx.getStorageSync('openId') || '',
            sessionKey: wx.getStorageSync('sessionKey') || '',
        };
        console.log(data)
        wx.uploadFile({
            header,
            filePath: data,
            name: 'file',
            url: baseURL + url,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}