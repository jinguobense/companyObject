const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    kong:'',
  },
  totuijianFabu() { //发布
    wx.navigateTo({
      url: '/baoA/pages/ItuijshopFabu/ItuijshopFabu?type=1',
    })

  },
  toXiu() {
    var _this = this
    wx.navigateTo({ //修改
      url: '/baoA/pages/ItuijshopFabu/ItuijshopFabu?type=2' + '&list=' + JSON.stringify(_this.data.list),
    })

  },
  //查询推荐好店
  getgoodShop() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.myurl,
      method: "POST",
      data: {
        cmd: "setUpShopLogo",
        mid: wx.getStorageSync('shopId'), // 店铺ID
        qstate: 0, //0-查询
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        

        if (res.data.result == 0) {
          var obj = res.data.shopImgBean
          var arr = Object.keys(obj)
          console.log(res.data.shopImgBean.length)
          if(arr.length > 0){
            _this.setData({
              list: res.data.shopImgBean,
              kong:false
            })
          }else{
            _this.setData({
              list: res.data.shopImgBean,
              kong:true
            })
          }
          
          console.log(_this.data.list)
          wx.showToast({
            title: res.data.resultNote,
            icon: "none",
            duration: 1500
          })

        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 1000)
        }

        wx.hideLoading()
      }

    })



  },



  //删除推荐
  del(e) {
    var _this = this
    console.log(e)
    var imgId = e.currentTarget.dataset.imgid
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "setUpShopLogo",
        mid: wx.getStorageSync('shopId'), // 店铺ID
        imgId: imgId, //图片ID
        qstate: 3, //3-删除
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res, 6666666)
        if (res.data.result == 0) {
          wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
              if (res.confirm) {

                wx.showToast({
                  title: "删除成功!",
                  icon: "none",
                  duration: 1500
                })
                _this.getgoodShop()

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        // if (res.data.result == 0) {
        //   setTimeout(function () {
        //     wx.showToast({
        //       title: res.data.resultNote,
        //       icon: "none",
        //       duration: 1500
        //     })
        //   }, 1000)
        //   _this.setData({
        //     list: [],
        //   })

        // } else {
        //   setTimeout(function () {
        //     wx.showToast({
        //       title: res.data.resultNote,
        //       icon: "none",
        //       duration: 1500
        //     })
        //   }, 1000)
        // }
        wx.hideLoading()


      }

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
    this.getgoodShop()
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