// pages/login/setUpShop/setUpShop.js
var app = getApp()
var interval = null //倒计时函数
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		shopName: '',
		typeList: [], //主营项目列表
		typeIndex: '',
		regionData: '',
		time: '获取验证码', //倒计时
		currentTime: 60,
		disabled: true,

		index:'', // 资质index

		shoptypeId: '', //主营项目id
		realName: "", //真实姓名
		idCardNum: "", //身份证号
		shoplogo: '', //店铺门面图
		shoptype: '', //主营项目
		detailaddr: "", //详细地址
		lng: '', //经度
		lat: "", //纬度
		creditCode: '', //唯一信用代码
		code: '', //输入的验证码
		realcode: '', //短信返回的验证码
		telephone: '', //手机号

		imgurl1: '',
		imgurl2: '',
		imgurl3: '',
		shopImgs: [], //资质图
		busiLicImg: [], //身份证图




		// supInfo:'', //补充信息
		// province:'', //省
		// city:'', //城市
		// twon:'',
		// refId:'', //推荐人Id
		// shopId:'' , // 店铺ID （弃审后修改需要-必填）
		imgList: {
			storeImg: '',
			permit1: '',
			permit2: '',
			permit3: '',
			idR: '',
			idW: ''
		}
	},

	//监听输入的店铺名称
	getshopName(e) {
		var shopName = e.detail.value
		this.setData({
			shopName: shopName
		})
	},
	//监听详细地址
	getdetailAddr(e) {
		var detailaddr = e.detail.value
		this.setData({
			detailaddr: detailaddr
		})
	},
	//监听社会代码
	getcreditCode(e) {
		var creditCode = e.detail.value;
		this.setData({
			creditCode: creditCode
		})
	},
	//监听真实姓名
	getrealName(e) {
		var realName = e.detail.value
		this.setData({
			realName: realName
		})
	},
	//监听身份证号
	getidCardNum(e) {
		var idCardNum = e.detail.value
		this.setData({
			idCardNum: idCardNum
		})
	},
	//监听手机号
	getphoneNum(e) {
		var telephone = e.detail.value
		this.setData({
			telephone: telephone
		})
	},
	//监听验证码
	getinputcode(e) {
		var code = e.detail.value
		this.setData({
			code: code
		})
	},
	//上传营业资质照片

	//发送验证码
	getrealCode() {
		var _this = this
		wx.request({
			url: app.globalData.myurl,
			data: {
				cmd: "phoneMSCode",
				userPhone: _this.data.telephone //发送验证码的手机号
			},
			header: {
				"content-type": "application/x-www-form-urlencoded",
			},
			success(res) {
				console.log(res)
				_this.getCode();
				
			}
		})
	},
	//获取店铺分类列表
	getShoptypeList() {
		var _this = this
		wx.request({
			url: app.globalData.myurl,
			data: {
				cmd: "shopTypeList"
			},
			header: {
				"content-type": "application/x-www-form-urlencoded",
			},
			success(res) {
				console.log(res)
				var shopTypeList = JSON.stringify(res.data.shopTypeList)
				_this.setData({
					typeList: res.data.shopTypeList
				})
				console.log(_this.data.typeList)
			}
		})
	},
	//上传店铺门面
	upshopImg() {
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
							if (res.data.zjstate == 1) {
								setTimeout(function () {
									wx.hideLoading()
									wx.stopPullDownRefresh() //停止下拉刷新
								}, 0)
								setTimeout(function () {
									wx.showModal({
										title: '您的账号已在其他设备登录，请重新登录！',
										showCancel: false, //是否显示取消按钮false去掉取消按钮
										success: function (res) {
											if (res.confirm) {
												wx.clearStorageSync()
												wx.reLaunch({
													url: '/pages/login/login',
												})
											} else {
												wx.clearStorageSync()
												wx.reLaunch({
													url: '/pages/login/login',
												})
											}
										}
									})
								}, 0)
								return
							}
							_this.setData({
								shoplogo: res.data.imgUrl
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
	//上传资质
	choseImg: function (e) {
		let _this = this;
	
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				console.log(res)
				var tempFilePaths = res.tempFilePaths[0]
				if (res.tempFiles[0].size > 1000000) {
					wx.showToast({
						title: '图片大于1M，请重新选择！',
						icon: 'none'
					})
					return
				} else {

					setTimeout(function () {
						wx.showLoading({
							title: '图片上传中',
						})
					}, 0)
					let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
					var list = [];
					list.push(base64)
					var shopImgs = _this.data.shopImgs;
					shopImgs.push(res.tempFilePaths[0])
					 
					_this.setData({
						shopImgs:shopImgs
					})
					console.log(shopImgs)

					wx.request({
						url: app.globalData.myurl,
						method: 'POST',
						data: {
							cmd: "uploadImg",
							imgFile: wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
						},
						header: {
							"content-type": "application/x-www-form-urlencoded",
						},
						success(res) {
							console.log(res)
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


			},

		})
	},
	//删除营业资质照片
	shanchuzhutu(e){
		var _this = this
		let indexs =  e.currentTarget.dataset.index
		let indexss = e.currentTarget.dataset.indexs
		var shopImgs = _this.data.shopImgs
		shopImgs.splice(indexs,1)

		var busiLicImg = _this.data.busiLicImg
		busiLicImg.splice(indexss,1)

		this.setData({
			shopImgs:shopImgs,
			busiLicImg:busiLicImg
		})
	},

	//上传身份证照片
	choseIdcartimg(){
		let _this = this;

		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				console.log(res)
				var tempFilePaths = res.tempFilePaths[0]
				if (res.tempFiles[0].size > 1000000) {
					wx.showToast({
						title: '图片大于1M，请重新选择！',
						icon: 'none'
					})
					return
				} else {

					setTimeout(function () {
						wx.showLoading({
							title: '图片上传中',
						})
					}, 0)
					let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
					var list = [];
					list.push(base64)
					var busiLicImg = _this.data.busiLicImg;
					busiLicImg.push(res.tempFilePaths[0])
					 
					_this.setData({
						busiLicImg:busiLicImg
					})
					console.log(busiLicImg)

					wx.request({
						url: app.globalData.myurl,
						method: 'POST',
						data: {
							cmd: "uploadImg",
							imgFile: wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
						},
						header: {
							"content-type": "application/x-www-form-urlencoded",
						},
						success(res) {
							console.log(res)
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


			},

		})
		
	},
	//获取推荐人
	gettuijian(){
		var _this = this
		wx.request({
			url: app.globalData.myurl,
			method:'post',
			data:{
				cmd:"getRefereeList",
				userId:wx.getStorageSync('userId'), // 用户id
				province:_this.data.regionData[0],	//省 
				city:_this.data.regionData[1],		//城市
				town:_this.data.regionData[2],	//县区	
			},
			success(res){
				console.log(res)
			}
		})

	},


	//提交申请
	tijiao() {
		var _this = this
		var shoptypeId = _this.data.typeList[typeIndex].shopTypeId
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			url: app.globalData.myurl,
			data: {
				cmd: "sApplication",
				userId: wx.getStorageSync('userId'), //用户id
				realName: _this.data.realName, //真实姓名
				idCardNum: _this.data.idCardNum, //身份证号
				telephone: _this.data.telephone, //联系电话
				smsCode: "", //联系电话获得的验证码
				shopName: _this.data.shopName, //店铺名称
				shopTypeId: shoptypeId, //主营项目即店铺分类，对应的店铺分类id
				lng: "", //地理经度
				lat: "", //地理纬度
				detailedAddr: _this.data.detailedAddr, //详细地址
				creditCode: _this.data.creditCode, //唯一社会信用代码
				shopImgs: JSON.stringify(_this.data.shopImgs),
				busiLicImg:JSON.stringify(_this.data.busiLicImg),
				shoplogo: _this.data.shoplogo, //店铺门面图片
				//supInfo: "", //补充信息
				province: "", //省 
				city: "", //城市
				town: "", //城市
				refId: "", //推荐人ID
				//	shopId: "", //店铺ID （弃审后修改需要-必填）
			},
			success(res) {
				console.log(res.data)
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getShoptypeList()
		this.gettuijian()
	},
	// 选择主营项目
	bindPickerChange: function (e) {
		console.log(e)
		console.log(e.detail.value)
		this.setData({
			typeIndex: e.detail.value
		})
	},
	// 选择地址
	bindRegionChange: function (e) {
		console.log('选择地址', e)
		var that = this
		that.setData({
			regionData: e.detail.value,
		})
		// this.findHospital();
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
	// // 获取验证码
	// getVerify: function () {
	// 	if (this.data.disabled) {
	// 		console.log(123456);
	// 		this.getCode();
	// 	}
	// },
	// 上传图片

	// 跳转失败详情
	goDetail: function () {
		wx.navigateTo({
			url: "/pages/login/defeat/defeat"
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