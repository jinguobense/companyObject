// baoA/pages/ItuijshopFabu/ItuijshopFabu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: 1, //0隐藏 1 显示
    showindex: 0, //0显示 1不显示
    value: '',
    imgUrl: '',
    goodsid: '', //相关联的goodsid
    goodsname: '', //相关的商品名称
    type: "", //1发布 2修改
    obj: '', //上一个页面返回的obj
    btnValue: ''
  },
  openmodel() {
    var _this = this;
    if (this.data.showmodel == 0) {
      _this.setData({
        showmodel: 1
      })
    } else {
      _this.setData({
        showmodel: 0
      })
    }
    console.log(this.data.showmodel)
  },
  // 选择显示
  xuanze(e) {
    var _this = this
    var show = e.currentTarget.dataset.show
    console.log(e)
    _this.setData({
      showindex: show
    })
    if (this.data.showindex == 0) {
      _this.setData({
        value: "显示",
      })
      this.openmodel()

    } else {
      _this.setData({
        value: "不显示",
      })
      this.openmodel()
    }
  },

  totuijshopgoods() {
    wx.navigateTo({
      url: '../Ituijshopgoods/Ituijshopgoods',
    })

  },
  //上传图片
  chooseImg() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        if (res.tempFiles[0].size > 1000000) {
          wx.showToast({
            title: '图片大于1M，请重新选择！',
            icon: 'none'
          })
          return
        } else {
          setTimeout(function () {
            wx.showLoading({
              title: '上传中',
            })
          })
          wx.request({
            url: app.globalData.myurl,
            method: 'POST',
            data: {
              cmd: "uploadImg",
              imgFile: wx.getFileSystemManager().readFileSync(tempFilePaths, "base64"), //base64加密图片 
            },
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "token": wx.getStorageSync('token')
            },
            success(res) {
              console.log(res)

              _this.setData({
                imgUrl: res.data.imgUrl
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 0)
              setTimeout(function () {
                wx.showToast({
                  title: res.data.resultNote,
                  icon: 'none',
                  duration: 1500
                })
              }, 0)
            }

          })

        }
      }
    })
  },
  //新建推荐好店
  newgoodShop(e) {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    if (_this.data.type == 1) {
      wx.request({
        url: app.globalData.myurl,
        method: 'post',
        data: {
          cmd: "setUpShopLogo",
          mid: wx.getStorageSync('shopId'), // 店铺ID
          img: _this.data.imgUrl, // 图片url连接
          state: _this.data.showindex, //显示状态（0显示，1不显示）
          urlvalue: _this.data.goodsid, //相关联商品的goodsid
          qstate: 1, //1-新增 //2修改
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },

        success(res) {
          console.log(res)
          var pages = getCurrentPages(); //当前页面
          var beforePage = pages[pages.length - 2]; //前一页
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
          wx.hideLoading()
        }
      })
    }
    if(_this.data.type == 2){
      wx.request({
        url: app.globalData.myurl,
        method: 'post',
        data: {
          cmd: "setUpShopLogo",
          mid: wx.getStorageSync('shopId'), // 店铺ID
          imgId:_this.data.obj.imgId,  //图片ID
          img: _this.data.imgUrl, // 图片url连接
          state: _this.data.showindex, //显示状态（0显示，1不显示）
          urlvalue: _this.data.goodsid, //相关联商品的goodsid
          qstate: 2, //1-新增 //2修改
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
  
        success(res) {
          console.log(res)
          var pages = getCurrentPages(); //当前页面
          var beforePage = pages[pages.length - 2]; //前一页
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var type = options.type
   console.log(options)
    
    if (type == 1) { //添加
      _this.setData({
        btnValue: '确 定 添 加',
        type: options.type,
      })
    } else { //修改
      var list = JSON.parse(options.list)
      _this.setData({
        btnValue: '确 定 修 改',
        type: options.type,
        obj: list
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