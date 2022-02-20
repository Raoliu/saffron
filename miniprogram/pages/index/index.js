// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    showDialog:false,
    scrollindex:0,  //当前页面的索引值
    totalnum:2,  //总共页面数
    starty:0,  //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0,  //滑动下拉距离
  },
  scrollTouchstart:function(e){
    let py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },
  scrollTouchmove:function(e){
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    if(py-d.starty<100 && py-d.starty>-100){    
      this.setData({
        margintop: py - d.starty
      })
    }
  },
  scrollTouchend:function(e){
    let d = this.data;
    if(d.endy-d.starty >100 && d.scrollindex>0){
      this.setData({
        scrollindex: d.scrollindex-1
      })
    }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.totalnum-1){
      this.setData({
        scrollindex: d.scrollindex+1
      })
    }
    this.setData({
        starty:0,
        endy:0,
        margintop:0
    })
  },
  more(){
    this.setData({
      showDialog:true
    })
  },
  close(){
    this.setData({
      showDialog:false
    })
  },
  to(){
    wx.navigateToMiniProgram({
      appId: 'wxb2fd083e2c7046c5',
      path: 'packages/goods/detail/index?kdt_id=45329716&alias=2xmqlxt2193mszg&scene=1089&subKdtId=0&notQueryVoucher=1&banner_id=g.1478114810~GoodsSearch~1~w7J3zUea&slg=consumer-search%2CstandardModify%2CTUPN4EN86FhegtO1644995778260%2C889.893.545_326e085de4184223af68220d9ed25e91&is_share=1&shopAutoEnter=1&share_from=null&from_uuid=TUPN4EN86FhegtO1644995778260',
      envVersion: 'release',// 打开正式版
      success(res) {
           // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
   })
  }
});
