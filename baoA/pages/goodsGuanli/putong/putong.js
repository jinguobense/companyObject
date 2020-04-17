const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1, //头部index
    leftindex: 0,
    rightlist: '',
    leftList: '',
    page: 1,
    typeId: '', //属性分类id
    totalPage: '',
  },
  changes(e) {
    this.setData({
      index: e.currentTarget.dataset.index,
      page: 1,
    })
    this.getgoodsListdata()
    this.getshuxingType()
  },
  changesL(e) {
    console.log(e.currentTarget.dataset.typeid)
    this.setData({
      leftindex: e.currentTarget.dataset.index,
      typeId: e.currentTarget.dataset.typeid,
      page: 1,
    })
    this.getgoodsListdata()

  },
  toGooodsinfo(e) {
    wx.navigateTo({
      url: '/baoA/pages/goodsGuanli/putongGoods/putongGoods?tabindex=' + e.currentTarget.dataset.type
    })
  },
  //点击进入发布商品
  toFabu() {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/baoA/pages/goodsFabu/putongFabu/putongFabu'
    })
    wx.hideLoading()
  },
  //点击进入图库
  toTuku() {
    wx.navigateTo({
      url: '/baoA/pages/Ituku/Ituku'
    })

  },
  //获取商品属性分类
  getshuxingType() {
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "goodType",
        shopId: wx.getStorageSync('shopId'), //店铺id
        state: "", //0 显示状态分类获取  1不显示状态分类获取   不发送此字段时获取所有
        type: 0, //商品活动类型 0-普通零售（含积分换购） 1-零售团购 3-零售满减 4-零售限时 5-厂家直销//传输type表示展示对应商品类型不为空的商品分类列表
        goodsState: _this.data.index //0-审核中 1-已上架 2-已下架 3-已弃审 4-已删除
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        _this.setData({
          leftList: res.data.goodTypeList,
          page: 1
        })
      }

    })
  },
  //获取普通商品列表数据
  getgoodsListdata() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "comGoodListData",
        nowPage: _this.data.page,
        shopId: wx.getStorageSync('shopId'), //进入首页获取的店铺id
        type: 0, //商品种类标签 0普通零售商品 1零售团购商品 3零售满减商品 4零售限时商品 5零售商品发起拼团
        state: _this.data.index, //0-审核中 1-已上架 2-已下架 3-审核未通过 4-已删除

        goodsTypeId: _this.data.typeId, //店内商品分类id 不传默认全部
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res, 333333333)
        if (_this.data.page == 1) {
          _this.setData({
            rightlist: res.data.goodsList,
            totalPage: res.data.totalPage
          })
        } else {
          var rightlist = _this.data.rightlist;
          for (var i in res.data.goodsList) {
            rightlist.push(res.data.goodsList[i])
          }
          _this.setData({
            rightlist: rightlist,
            totalPage: res.data.totalPage,
          })
        }
        wx.hideLoading();

      }



    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getshuxingType()
    this.getgoodsListdata()
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
    this.getshuxingType()

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
    console.log(111)
    console.log(this.data.page)
    if(this.data.page >= this.data.totalPage){
      wx.showToast({
        title: '已经到底啦',
        icon:'none',
        duration:1000
      })
      return false;
    }else{
      wx.showLoading({
        title: '加载中',
      })
      this.data.page = this.data.page+1
      setTimeout(function(){
        _this.getgoodsListdata()
      },0)
      setTimeout(function(){
        wx.hideLoading()
      },500)
      
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})