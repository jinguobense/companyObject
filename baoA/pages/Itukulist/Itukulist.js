const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    typeid: '', //分类id
    page: 1,
    searchKey: '',
    listData: '',
    totalPage: '',
    usetype: '',
    mask: false, //蒙版
    model: false, //弹框
  },
  //监听输入搜索
  watch(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  //回车搜索
  toSearch() {
    this.getlistDatas()
  },
  totukulistXq(e) {
    var _this = this
    console.log(e)
    var lunboimg = JSON.stringify(e.currentTarget.dataset.lunbo)
    var xqimg = e.currentTarget.dataset.detail

    wx.navigateTo({
      url: '../ItukulistXq/ItukulistXq?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
    })

  },
  //点击上传商品弹框
  uppic() {
    var _this = this
    _this.setData({
      mask: true,
      model: true
    })
  },
  //关闭弹框
  close() {
    var _this = this
    _this.setData({
      mask: false,
      model: false
    })
  },
  //去发布
  toFabu(e) {
    var _this = this
    console.log(e)
    var lunboimg = JSON.stringify(e.currentTarget.dataset.lunbo)
    var xqimg = e.currentTarget.dataset.detail
    var type = e.currentTarget.dataset.type

    if (type == 0) { //普通
      wx.navigateTo({
        url: '../goodsFabu/putongFabu/putongFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }
    if (type == 1) {
      wx.navigateTo({
        url: '../goodsFabu/tuanpingFabu/tuanpingFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }
    if (type == 2) {
      wx.navigateTo({
        url: '../goodsFabu/xianshiFabu/xianshiFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }
    if (type == 3) {
      wx.navigateTo({
        url: '../goodsFabu/manjianFabu/manjianFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }
    if (type == 4) {
      wx.navigateTo({
        url: '../goodsFabu/xiaozhongFabu/xiaozhongFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }
    if (type == 5) {
      wx.navigateTo({
        url: '../goodsFabu/xinrenFabu/xinrenFabu?lunboimg=' + lunboimg + "&xqimg=" + xqimg,
      })
    }



  },
  //获取分类下的所有商品图
  getlistDatas() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "getGoodsUnionImg",
        //三个搜索条件可选上传
        goodsName: _this.data.searchKey, //商品名称
        ArtNo: "", //货号---扫描商品一维码可得
        unitNo: "", //计量单位编号
        typeId: _this.data.typeid, //图库分类ID
        nowPage: _this.data.page //页数
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        if (res.data.result == 0) {
          if (_this.data.page == 1) {
            _this.setData({
              listData: res.data.imgList,
              totalPage: res.data.totalPage
            })
          } else {
            var listData = _this.data.listData;
            for (var i in res.data.imgList) {
              listData.push(res.data.imgList[i])
            }
            _this.setData({
              listData: listData,
              totalPage: res.data.totalPage
            })
          }
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }

        wx.hideLoading()
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    if (options.name) {
      _this.setData({
        searchKey: options.name,
        typeid: options.goodsid, //typeid
        usetype: options.usetype
      })
    }else{
      _this.setData({
        // searchKey: options.name,
        typeid: options.goodsid, //typeid
        usetype: options.usetype
      })
    }
    
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
    this.getlistDatas()
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
    var _this = this
    console.log(this.data.page)
    if (this.data.page >= this.data.totalPage) {
      wx.showToast({
        title: '已经到底啦',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.showLoading({
        title: '加载中',
      })
      this.data.page = this.data.page + 1
      _this.getlistDatas()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})