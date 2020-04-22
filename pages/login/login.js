// pages/login/login.js
const utilbase = require('../../utils/setpwdbase64')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    denglphone:'15290805361', //登录电话
    denglpasswd:'123456', //登录密码

  },
  // 登录电话
  dlphone(e) {
    let that = this
    that.setData({
      denglphone: e.detail.value
    })
  },

  // 登录密码
  dlpasswd(e) {
    let that = this
    that.setData({
      denglpasswd: e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
    })
  },
  //点击登录
  tologin(){
    let that = this
    var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    var inputStr = that.data.denglphone
    if (!(telStr.test(inputStr))) {
      wx.showToast({
        title: '手机号码输入不规范',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!that.data.denglpasswd) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    setTimeout(function() {
      wx.showLoading({
        title: '登录中',
      })
    }, 0)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd: "merlogin",
        userName: that.data.denglphone,
        password: utilbase.base64encode(utilbase.utf16to8(that.data.denglpasswd)),
        // password: that.data.denglpasswd,
        malltype: 1, //商家分类（1-零售商、2-批发商）
        unicode: ''
      },
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        setTimeout(function(){
          wx.hideLoading()
        },0)
        setTimeout(function(){
          wx.showToast({
            title: res.data.resultNote,
            icon:'none',
            duration:200
          })
        },0)

        if(res.data.result == 1){
          return
        }else{
          wx.setStorageSync("denglphone", that.data.denglphone);
          wx.setStorageSync("password", utilbase.base64encode(utilbase.utf16to8(that.data.denglpasswd)));
          wx.setStorageSync("userId", res.data.userId);
          wx.setStorageSync("userSig", res.data.userSig);
          wx.setStorageSync("shopId", res.data.shopId);
          wx.setStorageSync("phone", res.data.phone);
          wx.setStorageSync("userName", res.data.userName);
          wx.setStorageSync("token", res.data.token);
          app.globalData.myphones = that.data.denglphone;
        }
        if(res.data.isNInfo == 0 || res.data.checkstate == 2){
          setTimeout(function(){
            wx.navigateTo({
              url: './setUpShop/setUpShop?userid=' +  res.data.userId,
            })
          },1500)
        }else{
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          },1500)
        }

      },
      fail(error){
        setTimeout(function () {
          wx.hideLoading()
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 0)
        setTimeout(function () {
          wx.showToast({
            title: '网络错误，稍后重试',
            icon: 'none',
            duration: 1500
          })
        }, 0)
      }
    })

  },
  // 跳转注册开店
	goReg:function(){
		wx.navigateTo({
			url:"/pages/login/setUpShop/setUpShop"
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (wx.getStorageSync('shopId') && wx.getStorageSync('userId') && wx.getStorageSync('telephone')){
      setTimeout(function () {
        wx.showLoading({
          title: '登录中',
        })
      }, 0)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      wx.request({
        url: app.globalData.myurl,
        data:{
          cmd: "merlogin",
          userName: that.data.denglphone,
          password: utilbase.base64encode(utilbase.utf16to8(that.data.denglpasswd)),
          // password: that.data.denglpasswd,
          malltype: 1, //商家分类（1-零售商、2-批发商）
          unicode: ''
        },
        header:{
          "content-type":"application/x-www-form-urlencoded"
        },
        success(res){
          console.log(res)
          setTimeout(function(){
            wx.hideLoading()
          },0)
          setTimeout(function(){
            wx.showToast({
              title: res.data.resultNote,
              icon:'none',
              duration:200
            })
          },0)
  
          if(res.data.result == 1){
            return
          }else{
            wx.setStorageSync("denglphone", that.data.denglphone);
            wx.setStorageSync("password", utilbase.base64encode(utilbase.utf16to8(that.data.denglpasswd)));
            wx.setStorageSync("userId", res.data.userId);
            wx.setStorageSync("userSig", res.data.userSig);
            wx.setStorageSync("shopId", res.data.shopId);
            wx.setStorageSync("phone", res.data.phone);
            wx.setStorageSync("userName", res.data.userName);
            wx.setStorageSync("token", res.data.token);
            app.globalData.myphones = that.data.denglphone;
          }
          if(res.data.isNInfo == 0 || res.data.checkstate == 2){
            setTimeout(function(){
              wx.navigateTo({
                url: './setUpShop/setUpShop?userid=' +  res.data.userId,
              })
            },1500)
          }else{
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            },1500)
          }
  
        },
        fail(error){
          setTimeout(function () {
            wx.hideLoading()
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 0)
          setTimeout(function () {
            wx.showToast({
              title: '网络错误，稍后重试',
              icon: 'none',
              duration: 1500
            })
          }, 0)
        }
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