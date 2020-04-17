// baoA/pages/goodsFabu/manjianFabu/manjianFabu.js

const app = getApp()
Page({

  data: {
    headIndex: 0,
    zanshiName: '', //暂时
    anshiId: '', //暂时
    showAnceng: false, //暗层
    shopfenlModal: false, //店铺分类
    yijiModel: false, //一级分类
    erjiModel: false, //二级分类
    danweiModel: false, //单位
    addshopfenlModal: false,
    headIndex: 0,

    array: [], //商品单位
    shuxingFenleiarray: [], //商品属性分类列表
    yijiFenlei: '', //一级分类ID
    erjiFenlei: '', //二级分类ID
    danweis: '', //单位ID
    shuxing: '', //属性ID
    index: '', //商品单位下标
    sumfenlei: '', //一级二级总分类
    yijiindex: '', //一级分类下标
    erjiindex: '', //二级分类下标
    shuxingindex: '', //属性分类下标
    goodsValName: '', //商品名称

    imgURL: '', //信息封面图
    guigelist: [], //规格列表

    imglistobg: '', //上传的单个商品主图
    goodsZhutu: [], //商品主图列表
    xiangQingimg: '',
    hiddenmodalput: true, //新建商品属性显示
    name:'',

    totype: 1

  },
  //关闭弹窗
  close_dingdanTime() {
    this.setData({
      shopfenlModal: false, //店铺分类
      showAnceng: false, //暗层的显示
      yijiModel: false,
      erjiModel: false,
      danweiModel: false,
      addshopfenlModal: false
    })
  },
  //点击店铺分类弹窗
  showshoplist() {
    let _this = this
    if (!_this.data.shuxingFenleiarray.length) {
      _this.setData({
        showAnceng: true,
        shopfenlModal: true,
        zanshiName: '',
        anshiId: ''
      })
    } else {
      _this.setData({
        showAnceng: true,
        shopfenlModal: true,
        zanshiName: 0,
        anshiId: _this.data.shuxingFenleiarray[0].goodsTypeId
      })
    }
  },
  //店铺暂时存储
  changeshuxingVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.shuxingFenleiarray[e.detail.value[0]].goodsTypeId
    })
  },
  //属性确定
  shuxingChange() {
    let _this = this
    _this.setData({
      shuxingindex: _this.data.zanshiName,
      shuxing: _this.data.anshiId,
      showAnceng: false,
      shopfenlModal: false,
    })
  },
  //点击一级分类弹窗*********************************
  showyijilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      yijiModel: true,
      zanshiName: 0,
      anshiId: _this.data.sumfenlei[0].pfgTypeId1
    })
  },
  //一级暂时存储
  changeyijiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.sumfenlei[e.detail.value[0]].pfgTypeId1
    })
  },
  //确定1级分类
  yijiChange: function () {
    let _this = this
    this.setData({
      yijiindex: _this.data.zanshiName,
      yijiFenlei: _this.data.anshiId,
      showAnceng: false, //暗层的显示
      yijiModel: false,
      erjiindex: '',
      erjiFenlei: ''
    })
  },
  //未选一级，选二级*********************
  yesorno() {
    setTimeout(function () {
      wx.showToast({
        title: '请先选择一级分类',
        icon: 'none',
        duration: 1500
      })
    }, 0)
  },
  //点击二级分类弹窗****************
  showerjilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      erjiModel: true,
      zanshiName: 0,
      anshiId: _this.data.sumfenlei[_this.data.yijiindex].subTypeList[0].pfgTypeId2
    })
  },
  //二级暂时存储
  changeerjiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.sumfenlei[_this.data.yijiindex].subTypeList[e.detail.value[0]].pfgTypeId2
    })
  },
  //确定二级分类
  erjiChange: function (e) {
    let _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      erjiindex: _this.data.zanshiName,
      erjiFenlei: _this.data.anshiId,
      showAnceng: false,
      erjiModel: false,
    })
  },

  //点击单位弹窗*******************
  showdanweilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      danweiModel: true,
      zanshiName: 0,
      anshiId: _this.data.array[0].unitNo
    })
  },
  //单位暂时存储
  changedanweiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.array[e.detail.value[0]].unitNo
    })
  },
  //确定单位
  danweiChange: function (e) {
    let _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      index: _this.data.zanshiName,
      danweis: _this.data.anshiId,
      showAnceng: false,
      danweiModel: false,
    })
  },

  //获取平台分类
  getgoodstypelist() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "getPlatGoodType"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        _this.setData({
          sumfenlei: res.data.pfgType
        })

      }
    })
  },

  //获取平台属性列表
  getshoptypelist() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "getGoodsTypes",
        shopId: wx.getStorageSync('shopId')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res, 333333)
        _this.setData({
          shuxingFenleiarray: res.data.goodsTypes
        })
      }
    })
  },

  //获取单位
  getdanwei() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'post',
      data: {
        cmd: "getGoodUnitData"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        _this.setData({
          array: res.data.unitList
        })
      }
    })
  },

  //上传封面图
  addFengmian() {
    let _this = this
    wx.navigateTo({
      url: '../cropper/cropper',
    })
  },
  //上传主图
  addzhutuImg() {
    let _this = this
    _this.setData({
      imglistobg: ''
    })
    wx.navigateTo({
      url: '../cropper/cropper?type=zhu',
    })
  },
  //删除主图
  shanchuzhutu(e) {
    let indexs = e.currentTarget.dataset.index
    let tupianList = this.data.goodsZhutu
    tupianList.splice(indexs, 1)
    this.setData({
      goodsZhutu: tupianList
    })
  },

  //上传详情
  xiangqTu() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
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
            method: 'POST',
            data: {
              cmd: "uploadImg",
              imgFile: wx.getFileSystemManager().readFileSync(tempFilePaths, "base64"),
            },
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "token": wx.getStorageSync('token')
            },
            success(res) {
              _this.setData({
                xiangQingimg: res.data.imgUrl
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



  // //选择照片
  // chooseImage(e) {
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
  //     sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
  //     success: res => {
  //       const images = this.data.images.concat(res.tempFilePaths)
  //       // 限制最多只能留下3张照片
  //       this.data.images = images.length <= 3 ? images : images.slice(0, 3)
  //       $digest(this)
  //     }
  //   })
  // },

  // 跳转规格添加页面
  toAdd() {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/baoA/pages/goodsCanadd/goodsCanadd?index=0&guigelist=' + JSON.stringify(this.data.guigelist)
    })
    wx.hideLoading()
  },
  // 修改规格
  toxiugai(e) {
    console.log(e)
    wx.navigateTo({
      url: '/baoA/pages/goodsCanadd/goodsCanadd?index=0&guigelist=' + JSON.stringify(this.data.guigelist) + '&listitem=' + e.currentTarget.dataset.item,
    })
  },
  // 删除商品规格
  shanchuguige(e) {
    let indexs = e.currentTarget.dataset.index
    let tupianList = this.data.guigelist
    tupianList.splice(indexs, 1)
    this.setData({
      guigelist: tupianList
    })
  },
  // 头部切换
  changeIndex(e) {
    let _this = this
    console.log(e.currentTarget.dataset.index)
    _this.setData({
      headIndex: e.currentTarget.dataset.index
    })
  },
  // 商品名称
  goodsVal(e) {
    console.log(e)
    this.setData({
      goodsValName: e.detail.value
    })
  },
  //重置信息
  chongzhiInfoo(){
    let _this = this
    wx.showModal({
      title: '是否重置信息',
      success: function (res) {
        if (res.confirm) {
          _this.setData({
            index: '', //商品单位下标
            yijiFenlei: '',
            erjiFenlei: '',
            danweis: '',
            shuxing: '',
            index: '',
            yijiindex: '', //一级分类下标
            erjiindex: '', //二级分类下标
            shuxingindex: '', //属性分类下标
            goodsValName: '', //商品名称
            imgURL: '', //商品封面图
            guigelist: [],
            imglistobg: '',
            goodsZhutu: [],
            xiangQingimg: '',
            name: ''
          })
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },
  //添加属性
  addshuxingss(){
    let _this = this
    _this.setData({
      showAnceng: true,
      addshopfenlModal: true,
      shopfenlModal: false,
    })
  },
  // 添加新店铺分类
  iName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //添加新分类
  confirmM(){
    var _this = this
    if (!_this.data.name) {
      wx.showToast({
        title: '请输入分类',
        icon: 'none'
      })
      return
    }
    setTimeout(function () {
      wx.showLoading({
        title: '加载中',
      })
    }, 0)
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"upGoodsTypes",
        shopId:wx.getStorageSync('shopId') ,            //店铺编号
        name:_this.data.name,	  // 分类名称
        seq:11,		  // 序号
        state:0,		// 状态（0显示、1不显示）
        type:1,		// 1-新增；2-修改；3-删除
        //id          //属性id（只有新增数据时不需要）
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
        if (res.data.result == 1) {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: 'none',
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 1500
            })
          }, 0)
          _this.getshoptypelist()
          _this.setData({
            addshopfenlModal: false,
            showAnceng: false,
          })
        }
      }
    })
  },
  //上传普通零售
  tiJiaoInfo(e) {
    var _this = this
    if (!_this.data.goodsValName) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
      return
    }
    if (!_this.data.shuxing) {
      wx.showToast({
        title: '请选择店铺商品属性分类',
        icon: 'none'
      })
      return
    }
    if (!_this.data.yijiFenlei) {
      wx.showToast({
        title: '请选择一级分类',
        icon: 'none'
      })
      return
    }
    if (!_this.data.erjiFenlei) {
      wx.showToast({
        title: '请选择二级分类',
        icon: 'none'
      })
      return
    }
    if (!_this.data.danweis) {
      wx.showToast({
        title: '请选择商品单位',
        icon: 'none'
      })
      return
    }
    if (!_this.data.imgURL) {
      wx.showToast({
        title: '请上传封面图',
        icon: 'none'
      })
      return
    }
    if (_this.data.goodsZhutu.length < 1) {
      wx.showToast({
        title: '请上传商品主图',
        icon: 'none'
      })
      return
    }
    if (!_this.data.xiangQingimg) {
      wx.showToast({
        title: '请上传商品详情图',
        icon: 'none'
      })
      return
    }
    if (_this.data.guigelist.length < 1) {
      wx.showToast({
        title: '请至少添加一种规格',
        icon: 'none'
      })
      return
    }
    
    if (_this.data.totype == 1) {
      wx.showModal({
        title: '提示',
        content: '是否确认提交？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: app.globalData.myurl,
              method: 'POST',
              data: {
                cmd: "addCsGood",

                goodsCheckImgUrl: _this.data.imgURL, //商品外观图URL
                goodsUnitNo: _this.data.danweis, //商品销售计量单位编号
                goodsImgUrl: JSON.stringify(_this.data.goodsZhutu), //商品图片-多张轮播 URL
                shopId: wx.getStorageSync('shopId'), //店铺Id
                userId: wx.getStorageSync('userId'), //用户Id
                url: _this.data.xiangQingimg, //商品描述url					
                goodsName: _this.data.goodsValName, //商品名称
                shopGoodTypeId: _this.data.shuxing, //店内商品分类  
                pfgtypeid2Id: _this.data.erjiFenlei, //商品二级分类  

                goodsId: "", //商品ID（非必填）
                deadline: '', //取货截止时间 
                dedustate: 0, //是否参与积分换购 0 不参与积分; 1 参与积分; 2发起拼团
                // deduratio: null, //允许积分换购的比例  0.01
                // pnum: '', //拼团人数     （2发起拼团）
                // actime: '', //拼团活动时间    （2发起拼团）
                // skunameid: "", //规格名称Id  
                goodSkuList: JSON.stringify(_this.data.guigelist)
              },
              header: {
                "content-type": "application/x-www-form-urlencoded",
              },
              success:function(ress) {
                console.log(ress, 8888888888888)
                if (ress.data.result == 0) {
                  wx.showToast({
                    title: ress.data.resultNote,
                    icon: 'none',
                    duration: 1500
                  })
                  setTimeout(function () {
                    var pages = getCurrentPages(); //当前页面
                    var beforePage = pages[pages.length - 2]; //前一页
                    wx.navigateBack({
                      success: function () {
                        beforePage.onLoad(); // 执行前一个页面的onLoad方法
                      }
                    });
                    // wx.navigateBack({
                    //   delta: 1
                    // })

                  }, 1500)
                  return false;

                } else {
                  wx.showToast({
                    title: ress.data.resultNote,
                    icon: 'none',
                    duration: 1500
                  })

                }


               
              },
              fail:function(error){
                console.log(error)
              }

            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }

      })


    }else{
      return
    }


  },



  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options)
    let _this = this
    if (options.goodsId) {
      _this.setData({
        goodsId: options.goodsId
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
    let _this = this
    let goodsZhutu = _this.data.goodsZhutu
    console.log(goodsZhutu)
    if (_this.data.imglistobg) {
      goodsZhutu.push(_this.data.imglistobg)
    }
    _this.setData({
      goodsZhutu: goodsZhutu
    })
    _this.getdanwei()
    _this.getshoptypelist()
    _this.getgoodstypelist()
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