//获取应用实例
const app = getApp()
Page({
  data: {
    src: '',
    width: 300, //宽度
    height: 300, //高度
    max_width: 400,
    max_height: 400,
    disable_rotate: true, //是否禁用旋转
    disable_ratio: false, //锁定比例
    limit_move: true, //是否限制移动
    type: '',
    flag:true,
  },
  onLoad: function(options) {
    console.log(options)
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.upload(); //上传图片
  },
  // onShow: function () {
  //   this.cropper = this.selectComponent("#image-cropper");
  //   this.cropper.upload(); //上传图片
  // },
  // cropperload(e) {
  //   console.log('cropper加载完成');
  // },
  loadimage(e) {
    wx.hideLoading();
    // console.log('图片');
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //图片预览
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  upload() {
    let that = this;
    console.log('CAIJIAN')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log('5252')
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
      },
      fail(err){
        console.log('取消了')
      }
    })
  },
  setWidth(e) {
    this.setData({
      width: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_left: this.cropper.data.cut_left
    });
  },
  setHeight(e) {
    this.setData({
      height: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_top: this.cropper.data.cut_top
    });
  },
  switchChangeDisableRatio(e) {
    //设置宽度之后使剪裁框居中
    this.setData({
      disable_ratio: e.detail.value
    });
  },
  setCutTop(e) {
    this.setData({
      cut_top: e.detail.value
    });
    this.setData({
      cut_top: this.cropper.data.cut_top
    });
  },
  setCutLeft(e) {
    this.setData({
      cut_left: e.detail.value
    });
    this.setData({
      cut_left: this.cropper.data.cut_left
    });
  },
  switchChangeDisableRotate(e) {
    //开启旋转的同时不限制移动
    if (!e.detail.value) {
      this.setData({
        limit_move: false,
        disable_rotate: e.detail.value
      });
    } else {
      this.setData({
        disable_rotate: e.detail.value
      });
    }
  },
  switchChangeLimitMove(e) {
    //限制移动的同时锁定旋转
    if (e.detail.value) {
      this.setData({
        disable_rotate: true
      });
    }
    this.cropper.setLimitMove(e.detail.value);
  },
  switchChangeDisableWidth(e) {
    this.setData({
      disable_width: e.detail.value
    });
  },
  switchChangeDisableHeight(e) {
    this.setData({
      disable_height: e.detail.value
    });
  },
  submit() {
    let that = this
    that.setData({
      flag:false
    })
    this.cropper.getImg((obj) => {
      setTimeout(function () {
        wx.showLoading({
          title: '上传中',
          mask: true
        })
      }, 0)
      wx.request({
        url: app.globalData.myurl,
        method:'POST',
        data: {
          cmd: "uploadImg",
          imgFile: wx.getFileSystemManager().readFileSync(obj.url, "base64"),
        },
        header: {
          "content-type": "application/x-www-form-urlencoded",
          // "token": wx.getStorageSync('token')
        },
        success(res) {
          console.log('res')
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
          console.log(res)
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];
          var prevPage = pages[pages.length - 2]; //获取上一个页面
          if (that.data.type) {
            prevPage.setData({ //修改上一个页面的变量
              imglistobg: res.data.imgUrl
            })
          } else {
            prevPage.setData({ //修改上一个页面的变量
              imgURL: res.data.imgUrl,
            })
          }
          wx.navigateBack({
            delta: -1
          })
        }
      });
      app.globalData.imgSrc = obj.url;

    });
  },
  rotate() {
    //在用户旋转的基础上旋转90°
    this.cropper.setAngle(this.cropper.data.angle += 90);
  },
  top() {
    this.data.top = setInterval(() => {
      this.cropper.setTransform({
        y: -3
      });
    }, 1000 / 60)
  },
  bottom() {
    this.data.bottom = setInterval(() => {
      this.cropper.setTransform({
        y: 3
      });
    }, 1000 / 60)
  },
  left() {
    this.data.left = setInterval(() => {
      this.cropper.setTransform({
        x: -3
      });
    }, 1000 / 60)
  },
  right() {
    this.data.right = setInterval(() => {
      this.cropper.setTransform({
        x: 3
      });
    }, 1000 / 60)
  },
  narrow() {
    this.data.narrow = setInterval(() => {
      this.cropper.setTransform({
        scale: -0.02
      });
    }, 1000 / 60)
  },
  enlarge() {
    this.data.enlarge = setInterval(() => {
      this.cropper.setTransform({
        scale: 0.02
      });
    }, 1000 / 60)
  },
  end(e) {
    clearInterval(this.data[e.currentTarget.dataset.type]);
  },
})