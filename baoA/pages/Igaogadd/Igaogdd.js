// baoA/pages/Igaogadd/Igaogdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'', //0 新建  1 修改  2 删除
    leixing:false, //链接类型弹窗
    huodong:false ,  //链接活动弹窗

    inpNum:'', //监听序号
    linkType:'', //链接类型
    linkActive:'', //链接活动
    linkAcnum:'',

    TypeValue:'', 
    ActiveValue:'',
    imgUrl:'' ,
    imgId:""
  },
  leixing(){
    if(this.data.leixing == false){
      this.setData({
        leixing:true,
        huodong:false
      })
    }else{
      this.setData({
        leixing:false,
      })
    }
  },
  huodong(){
    if(this.data.huodong == false){
      this.setData({
        leixing:false,
        huodong:true
      })
    }else{
      this.setData({
        huodong:false
      })
    }
  },
  //显示图片选择弹窗
  
  closepic(){
    this.setData({
      picmode:false
    })
  },
  //监听序号
  inputnum(e){
    console.log(e)
    var num = e.detail.value;
    this.setData({
      inpNum:num
    })
  },

  //监听链接类型
  typeTab(e){
    var _this = this
    console.log(e)
    var linkType = e.currentTarget.dataset.type
    if(linkType == 0){
      _this.setData({
        TypeValue:'商品',
        linkType:linkType,
        leixing:false
      })
    }
    if(linkType == 1){
      _this.setData({
        TypeValue:'活动',
        linkType:linkType,
        leixing:false
      })
    }
    if(linkType == 2){
      _this.setData({
        TypeValue:'活动公告',
        linkType:linkType,
        leixing:false
      })
    }

  },
  //监听链接活动
  activeTab(e){
    var _this = this
    var linkActive = e.currentTarget.dataset.value;
    if(linkActive == 1){
      _this.setData({
        ActiveValue:'团购活动',
        linkActive:linkActive,
        huodong:false
      })
    }
    if(linkActive == 3){
      _this.setData({
        ActiveValue:'满减活动',
        linkActive:linkActive,
        huodong:false
      })
    }
    if(linkActive == 4){
      _this.setData({
        ActiveValue:'限时活动',
        linkActive:linkActive,
        huodong:false
      })
    }
    if(linkActive == 5){
      _this.setData({
        ActiveValue:'领取优惠券',
        linkAcnum:linkActive,
        huodong:false
      })
    }

  },
  
  //广告信息操作
  setList(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method:'POST',
      data:{
        cmd:"upShopImg",
        shopId:wx.getStorageSync('shopId') ,            //店铺编号
         imgId:_this.data.imgId,             //图片ID 
         seq:_this.data.inpNum,                  //序号
         type:_this.data.type,                //0 新建  1 修改  2 删除
         urlType:_this.data.linkType,           //链接类型:   0商品 ，1活动，2活动公告
         urlValue:_this.data.ActiveValue,           //链接类型值：（商品链接：goodsid）(活动链接：1团购活动，3满减活动，4限时活动，5领取优惠券)
        imgUrl:_this.data.imgUrl,        //图片路径
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res,123123123)
        if(res.data.result == 1){
          wx.showToast({
            title: res.data.resultNote,
            icon:'none',
            duration:1500
          })
        }else{
          wx.showToast({
            title: res.data.resultNote,
            icon:'none',
            duration:1500
          })
          var pages = getCurrentPages(); //当前页面
          var beforePage = pages[pages.length - 2]; //前一页
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
        }
        wx.hideLoading()
      }
    })

  },
  //上传照片
  choseImg(){
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log(res)
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
          }, 0)
          wx.request({
            url: app.globalData.myurl,
            method:'POST',
            data:{
              cmd: "uploadImg",
              imgFile: wx.getFileSystemManager().readFileSync(tempFilePaths, "base64"),
            },
            header:{
              "content-type": "application/x-www-form-urlencoded",
              "token": wx.getStorageSync('token')
            },
            success(res){
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var type = options.type
    _this.setData({
      type:type,
      imgId:options.imgId
    })
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