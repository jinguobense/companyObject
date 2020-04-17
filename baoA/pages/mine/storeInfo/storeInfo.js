// pages/mine/storeInfo/storeInfo.js

//获取应用实例
var util = require('../../../../utils/util'); // 转换时间插件
var webim = require('../../../../utils/webim_wx.js'); // 腾讯云 im 包
var webimhandler = require('../../../../utils/webim_handler.js'); // 这个是所有 im 事件的 js
const app = getApp()
var QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
		storeName:"",
		time:'24小时营业',
		phone:"0321-6668888",
		disabled:true,
		type:1,
    storeImg:'', //封面
    shopinfo:'',
    autofocus:'',
    shopaddr:'',
    shopZiIgm:'', //资质图
    shopTypeId:'', //主营分类id 
    lng:""  ,              //地理经度
    lat:"" ,               //地理纬度 通过经度纬度定位（具体位置）
    
  },
  getshopInfo(){
    var _this = this
    wx.showLoading({
      title:'加载中'
    })
   wx.request({
    url:app.globalData.myurl,
    data:{
      cmd:"getShop",
      shopId:wx.getStorageSync('shopId') ,
      userId:wx.getStorageSync('userId')
    },
    header:{
      "content-type": "application/x-www-form-urlencoded",
    },
    success(res){
      console.log(res)
      var shopobj = res.data.shopBean
      _this.setData({
        shopinfo:res.data.shopBean,
        storeName:shopobj.shopName,
        phone:shopobj.shopPhone,
        time:shopobj.busiTime,
        storeImg:shopobj.smallLogoUrl,
        shopZiIgm:shopobj.shopImgs,
        shopTypeId:shopobj.shopTypeId,
        shopaddr:shopobj.detailAddr,
        lng:shopobj.lng,
        lat:shopobj.lat
  
      })

      wx.hideLoading()

    }


   })
    
  },
  //名称
  shopname(e){
    //console.log(e)
    var value = e.detail.value
    this.setData({
      storeName:value
    })
    
  },
  //电话
  phone(e){
    // console.log(e)
    var value = e.detail.value
    this.setData({
      phone:value
    })
   
  },
  //时间
  inpTime(e){
    var value = e.detail.value
    this.setData({
      time:value
    })
  },

  //打开地图
  openmap(){
    var _this = this;
    app.globalData.isdingwei = true;
    wx.chooseLocation({
     success(res){
       console.log(res,'地图')
       qqmapsdk.reverseGeocoder({
         location:{
          latitude: res.latitude,
          longitude: res.longitude
         },
         success:function(ress){
           console.log(ress,'地图')
           console.log(ress.result.formatted_addresses)
           _this.setData({
            shopaddr:ress.result.formatted_addresses.recommend,
            lng:ress.result.location.lng,
            lat:ress.result.location.lat
           })
         }
         
       })
     }
    })
  },
  
  // 编辑信息
	edit:function(){
    var _this = this
		_this.setData({
			type:2,
      disabled:false,
      autofocus:true
    })
   
	},
	// 保存信息
	save:function(){
    var _this = this
		this.setData({
			type:1,
			disabled:true
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"updShop",
        shopId:wx.getStorageSync('shopId') ,            //店铺编号
        userId:wx.getStorageSync('userId') ,            //用户编号
        
        shopTypeId:_this.data.shopTypeId ,        //店铺主营分类
        shopName:_this.data.storeName ,          //店铺名称
        shopPhone:_this.data.phone ,         //店铺电话
        detailAddr:_this.data.shopaddr,        //店铺地址
        lng:_this.data.lng ,              //地理经度
        lat:_this.data.lat ,               //地理纬度 通过经度纬度定位（具体位置）
        shopTips:""  ,         //本店提醒（会体现在用户订单信息中）
        busiTime:_this.data.time  ,         //营业时间
        busiRemark:"",         //营业备注
        shoplogo:_this.data.storeImg ,          //店铺logo图
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(res.data.result == 1){
          setTimeout(function(){
            wx.showToast({
              title: res.data.resultNote,
              icon:'none',
              duration:1500
            })
          },1500)
        }else{
          setTimeout(function(){
            wx.showToast({
              title: res.data.resultNote,
              icon:'none',
              duration:1500
            })
          },1500)
          _this.getshopInfo()
        }
       

      }
    })

    
	},
	choseImg:function(){
		let that = this
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
              that.setData({
                storeImg: res.data.imgUrl
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

  
  onLoad: function (options) {
    var _this = this
    // 获取店铺信息
    this.getshopInfo()
    //实例化核心api
    qqmapsdk = new QQMapWX({
      key: 'JZPBZ-U5CWU-WAMVJ-2SCHB-AQDY5-LKF6U' //腾讯地图key
    });
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