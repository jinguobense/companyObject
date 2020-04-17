const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {       //0    
    // tabList:['全部','待付款','拼团中','待取货','待配送','配送中','已完成','待评价','退款售后',],
    tabindex:0,
    moveParams: {
      scrollLeft: 0, // scroll-view滚动的距离,默认为0,因为没有触发滚动
      subLeft:0, //点击元素距离屏幕左边的距离
      subHalfWidth: 0, //点击元素的宽度一半
      screenHalfWidth: 187.5, //屏幕宽度的一半
    },
		cur:0,
    scrollLeft:0,
    page:1,
    maxlist:'', //全部订单
    list:[], //全部订单列表
    list1:[],
    list2:[],
    list3:[],
    list4:[],
    list5:[],
    list6:[],
    list7:[],
    list8:[],
    list9:[]
  },
  // tab滑动动画
  getRect(ele) { //获取点击元素的信息,ele为传入的id
    var that = this;
    wx.createSelectorQuery().select(ele).boundingClientRect(function (rect) {
      let moveParams = that.data.moveParams;
      moveParams.subLeft = rect.left;
      moveParams.subHalfWidth = rect.width / 2; 
      that.moveTo();
    }).exec()
  },
  moveTo: function () {
    let subLeft = this.data.moveParams.subLeft;
    let screenHalfWidth = this.data.moveParams.screenHalfWidth;
    let subHalfWidth = this.data.moveParams.subHalfWidth;
    let scrollLeft = this.data.moveParams.scrollLeft;

    let distance = subLeft - screenHalfWidth + subHalfWidth;

    scrollLeft = scrollLeft + distance;
    // console.log(subLeft)
    this.setData({
      scrollLeft: scrollLeft
    })
  },
  changetab(e){
    var _this = this
    let ele = 'ele' + e.target.dataset.current
    this.setData({
      tabindex: e.target.dataset.current,
      page:1,
    });
    this.getRect('#' + ele);
    //console.log(this.data.tabindex)
    wx.showLoading({
      title: '加载中',
    })
    if(e.target.dataset.current == 0){ //全部
      this.getOrderList()
    }
    if(e.target.dataset.current == 1){ //待付款
      this.getlist1()
      
    }
     if(e.target.dataset.current == 2){ //拼团中
      this.getlist2()
      
    }
     if(e.target.dataset.current == 3){ //待取货
      this.getlist3()
     
    }
     if(e.target.dataset.current == 4){ //待发货
      this.getlist4()
      
    }
     if(e.target.dataset.current == 5){ //待收货
      this.getlist5()
     
    }
     if(e.target.dataset.current == 6){ //申请退款
      this.getlist6()
      
    }
     if(e.target.dataset.current == 7){ //待评价
      this.getlist7()
      
    }
     if(e.target.dataset.current == 8){ //已完成
      this.getlist8()
      
    }
     if(e.target.dataset.current == 9){ //退款售后
      this.getlist9()
    }
  },
  scrollMove(e) {
    let moveParams = this.data.moveParams;
    moveParams.scrollLeft = e.detail.scrollLeft;
    this.setData({
      moveParams: moveParams
    })
    // console.log(e)
  },

  // 跳转详情
  goDetail:function(e){
    let index=e.currentTarget.dataset.index
    console.log(e)
    var id = e.currentTarget.dataset.id
    var orderno = e.currentTarget.dataset.orderno
    wx.navigateTo({
      url:'../orderDetail/orderDetail?id=' + id + '&orderno=' + orderno
    })
  },
  //获取全部订单列表
  getOrderList(){
    var _this = this
    var type = _this.data.tabindex
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:"" ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })
  },
  //获取待付款
  getlist1(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:0 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list1: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list1;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list1: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })
  },
  //拼团中
  getlist2(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:1 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list2: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list2;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list2: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })
  },
  //待取货
  getlist3(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:2 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list3: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list3;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list3: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })
  },
  //待发货
  getlist4(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:3 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list4: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list4;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list4: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //待收货
  getlist5(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:4 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list5: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list5;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list5: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //申请退款
  getlist6(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:6 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list6: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list6;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list6: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //待评价
  getlist7(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:9 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list7: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list7;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list7: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //已完成
  getlist8(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:5 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list8: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list8;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list8: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //退款售后
  getlist9(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrder",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
        nowPage:_this.data.page,
        type:7 ,// //0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-申请退款 7-已退款 8-申请退款+已退款 9-待评价 传空默认全部 
        orderno:""   
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        if(_this.data.page == 1){
          _this.setData({
            list9: res.data.orderBeans,
            maxlist: res.data.totalPage,
            
          })
        }else{
          var list = _this.data.list9;
          for (var i in res.data.orderBeans) {
            list.push(res.data.orderBeans[i])
          }
          _this.setData({
            list9: list,
            maxlist: res.data.totalPage,
          })
        }
        wx.hideLoading();
      }
    })

  },
  //确认取货
  quhuo(e){
    var _this = this
    var id = e.currentTarget.dataset.id

    wx.request({
      url:app.globalData.myurl ,
      data:{
        cmd:"updOrderReceiving",
        shopId:wx.getStorageSync('shopId') ,            //店铺id
        userId:wx.getStorageSync('userId')  ,            //管理员编号
        id:id   ,             //订单id
        verno:"",              //订单核销码
      }
    })
  },
  //同意退款
  tuipay(){

  },


 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		this.setData({
      tabindex:options.index
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
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.tabindex == 0) {
      this.getOrderList();
    }
    if (this.data.tabindex == 1) {
      this.getlist1();
    }
    if (this.data.tabindex == 2) {
      this.getlist2();
    }
    if (this.data.tabindex == 3) {
      this.getlist3();
    }
    if (this.data.tabindex == 4) {
      this.getlist4();
    }
    if (this.data.tabindex == 5) {
      this.getlist5();
    }
    if (this.data.tabindex == 6) {
      this.getlist6();
    }
    if (this.data.tabindex == 7) {
      this.getlist7();
    }
    if (this.data.tabindex == 8) {
      this.getlist8();
    }
    if (this.data.tabindex == 9) {
      this.getlist9();
    }


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
    if(this.data.page >= this.data.maxlist){
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
        if(_this.data.tabindex == 0){
          _this.getOrderList();
        }
        if(_this.data.tabindex == 1){
          _this.getlist1()
        }
        if(_this.data.tabindex == 2){
          _this.getlist2()
        }
        if(_this.data.tabindex == 3){
          _this.getlist3()
        }
        if(_this.data.tabindex == 4){
          _this.getlist4()
        }
        if(_this.data.tabindex == 5){
          _this.getlist5()
        }
        if(_this.data.tabindex == 6){
          _this.getlist6()
        }
        if(_this.data.tabindex == 7){
          _this.getlist7()
        }
        if(_this.data.tabindex == 8){
          _this.getlist8()
        }
        if(_this.data.tabindex == 9){
          _this.getlist9()
        }
       
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