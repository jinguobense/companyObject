// pages/mine/reset/reset.js
var interval = null //倒计时函数
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: 'text',
    time: '获取验证码', //倒计时 
    currentTime: 60,
    disabled: true,
    tel: '',
    userName: '',
    code:'',
    inputcode:'',
    passwsd:'',
    repasswsd:''
  },
  //获取输入的密码
  getpasswsd(e){
    var passwsd = e.detail.value
    this.setData({
      passwsd:passwsd
    })
  },
  getrepasswsd(e){
    var repasswsd = e.detail.value
    this.setData({
      repasswsd:repasswsd
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.type == 1) {
      this.setData({
        inpType: "number",
        tel: options.tel,
        userName: options.userName
      })
      wx.setNavigationBarTitle({
        title: '重置交易密码'
      })
    } else if (options.type == 2) {
      this.setData({
        inpType: "password"
      })
      wx.setNavigationBarTitle({
        title: '重置登录密码'
      })
    }
  },
  // 验证码倒计时
  getCode: function (options) {
    console.log("验证");
    let that = this;
    let currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒后重新发送',
        disabled: false
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          disabled: true
        })
      }
    }, 1000)
  },
  // 获取验证码
  getVerify: function () {
    var _this = this
    if (this.data.disabled) {
      console.log(123456);
      this.getCode();
      wx.request({
        url: app.globalData.myurl,
        data: {
          cmd: "sendMSmsCode",
          userName: _this.data.userName, //登录名
          userPhone: _this.data.tel, //type 为 8 时需要在设定新手机号时附带新手机号
          //这里的手机号均为后台账号对应的手机号
          type: 9, //6忘记密码 7修改手机号初次验证老号码  8修改手机号验证新号码 9-修改交易密码
        },
        header:{
          "content-type": "application/x-www-form-urlencoded",
        },
        success(res){
          console.log(res.data)
          _this.setData({
             //获取短信发的验证码
          })
        }
      })
    }

  },
  //获取输入的验证码
  inputcode(e){
    var _this = this;
    var inputcode = e.detail.value
    _this.setData({
      inputcode:inputcode
    })
  },
  //校验验证码
  testCode(e){
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"checkMSmsCode",
        userName:_this.data.userName , //登录名
          smsCode:_this.data.code ,  //短信验证码
          type:"" ,
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
      }
    })
  },
  sure(){
    var _this = this
    if(_this.data.inputcode != _this.data.code){
      wx.showToast({
        title: '验证码输入错误请重新输入',
        icon:"none",
        duration:1500
      })
    }
    if(_this.data.passwsd != _this.data.repasswsd){
      wx.showToast({
        title: '两次输入的密码不一致，请重新输入',
        icon:"none",
        duration:1500
      })
    }
    wx.request({
      url: app.globalData.myurl,
      data:{
          cmd:"tPassword",
          userId:wx.getStorageSync('userId') ,        //用户id
          opassword:'' ,  //原密码
          npassword:_this.data.passwsd , //交易密码
        cpassword:_this.data.repasswsd,  //确认密码
        type:1,     //1-重置交易密码（type值必填项）
        smsCode:_this.data.code,  //验证码
        userPhone:_this.data.tel //用户手机号
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
      }
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