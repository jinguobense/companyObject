var util = require('../../../../utils/util.js'); // 转换时间插件
var TIM = require('../../../../utils/tim-wx.js'); // 腾讯云 im 包
var COS = require('../../../../utils/cos-wx-sdk-v5.js'); // 腾讯云 im 包
//var util = require('../../../../utils/util.js');
const app = getApp();
let options = {
  SDKAppID: '1400205994' // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options);
tim.registerPlugin({ 'cos-wx-sdk': COS });
// pages/kefu/kefu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selToID: '',
    friendId: '',
    friendName: '',
    friendAvatarUrl: '',
    content: '',
    selSess: '',
    list: [],   //type 0 自己  1他人 
    scrollTop: 0,//控制上滑距离
    windowHeight: 0,//页面高度
    type: false,
    length: '',
    bqtype: true,
    imgtype: true,
    id: "",
    msglist: [1,2,3,4,5,6,7,8],
    isbegin: false,
    isstart: false,
    jiantingobj: null,
    bqqlist: [
      { img: '/baoB/images/emoji/zy.png', text: '[龇牙]' },
      { img: '/baoB/images/emoji/tp.png', text: '[调皮]' },
      { img: '/baoB/images/emoji/lh.png', text: '[流汗]' },
      { img: '/baoB/images/emoji/tx.png', text: '[偷笑]' },
      { img: '/baoB/images/emoji/zj2.png', text: '[再见]' },
      { img: '/baoB/images/emoji/qd.png', text: '[敲打]' },
      { img: '/baoB/images/emoji/ch.png', text: '[擦汗]' },
      { img: '/baoB/images/emoji/zt.png', text: '[猪头]' },
      { img: '/baoB/images/emoji/mg.png', text: '[玫瑰]' },
      { img: '/baoB/images/emoji/ll.png', text: '[流泪]' },
      { img: '/baoB/images/emoji/dk.png', text: '[大哭]' },
      { img: '/baoB/images/emoji/x.png', text: '[嘘]' },
      { img: '/baoB/images/emoji/k.png', text: '[酷]' },
      { img: '/baoB/images/emoji/zk.png', text: '[抓狂]' },
      { img: '/baoB/images/emoji/wq.png', text: '[委屈]' },
      { img: '/baoB/images/emoji/bb.png', text: '[便便]' },
      { img: '/baoB/images/emoji/zd.png', text: '[炸弹]' },
      { img: '/baoB/images/emoji/cd1.png', text: '[菜刀]' },
      { img: '/baoB/images/emoji/ka.png', text: '[可爱]' },
      { img: '/baoB/images/emoji/s1.png', text: '[色]' },
      { img: '/baoB/images/emoji/hx.png', text: '[害羞]' },
      { img: '/baoB/images/emoji/dy.png', text: '[得意]' },
      { img: '/baoB/images/emoji/t.png', text: '[吐]' },
      { img: '/baoB/images/emoji/wx.png', text: '[微笑]' },
      { img: '/baoB/images/emoji/n.png', text: '[怒]' },
      { img: '/baoB/images/emoji/gg.png', text: '[尴尬]' },
      { img: '/baoB/images/emoji/jk.png', text: '[惊恐]' },
      { img: '/baoB/images/emoji/lh1.png', text: '[冷汗]' },
      { img: '/baoB/images/emoji/ax.png', text: '[爱心]' },
      { img: '/baoB/images/emoji/sa.png', text: '[示爱]' },
      { img: '/baoB/images/emoji/by.png', text: '[白眼]' },
      { img: '/baoB/images/emoji/am.png', text: '[傲慢]' },
      { img: '/baoB/images/emoji/ng.png', text: '[难过]' },
      { img: '/baoB/images/emoji/jy.png', text: '[惊讶]' },
      { img: '/baoB/images/emoji/yw.png', text: '[疑问]' },
      { img: '/baoB/images/emoji/k1.png', text: '[困]' },
      { img: '/baoB/images/emoji/mmd.png', text: '[么么哒]' },
      { img: '/baoB/images/emoji/hx1.png', text: '[憨笑]' },
      { img: '/baoB/images/emoji/aq.png', text: '[爱情]' },
      { img: '/baoB/images/emoji/s.png', text: '[衰]' },
      { img: '/baoB/images/emoji/pz.png', text: '[撇嘴]' },
      { img: '/baoB/images/emoji/yx.png', text: '[阴险]' },
      { img: '/baoB/images/emoji/fd2.png', text: '[奋斗]' },
      { img: '/baoB/images/emoji/fd.png', text: '[发呆]' },
      { img: '/baoB/images/emoji/yhh.png', text: '[右哼哼]' },
      { img: '/baoB/images/emoji/bb.png', text: '[抱抱]' },
      { img: '/baoB/images/emoji/hx2.png', text: '[坏笑]' },
      { img: '/baoB/images/emoji/fw.png', text: '[飞吻]' },
      { img: '/baoB/images/emoji/bs.png', text: '[鄙视]' },
      { img: '/baoB/images/emoji/y.png', text: '[晕]' },
      { img: '/baoB/images/emoji/db.png', text: '[大兵]' },
      { img: '/baoB/images/emoji/kl.png', text: '[可怜]' },
      { img: '/baoB/images/emoji/q.png', text: '[强]' },
      { img: '/baoB/images/emoji/r.png', text: '[弱]' },
      { img: '/baoB/images/emoji/ws.png', text: '[握手]' },
      { img: '/baoB/images/emoji/sl.png', text: '[胜利]' },
      { img: '/baoB/images/emoji/bq.png', text: '[抱拳]' },
      { img: '/baoB/images/emoji/dl.png', text: '[凋谢]' },
      { img: '/baoB/images/emoji/mf.png', text: '[米饭]' },
      { img: '/baoB/images/emoji/dg.png', text: '[蛋糕]' },
      { img: '/baoB/images/emoji/xg.png', text: '[西瓜]' },
      { img: '/baoB/images/emoji/pj.png', text: '[啤酒]' },
      { img: '/baoB/images/emoji/pc.png', text: '[瓢虫]' },
      { img: '/baoB/images/emoji/gy.png', text: '[勾引]' },
      { img: '/baoB/images/emoji/[OK]@2x.png', text: '[OK]' },
      { img: '/baoB/images/emoji/an.png', text: '[爱你]' },
      { img: '/baoB/images/emoji/kf.png', text: '[咖啡]' },
      { img: '/baoB/images/emoji/yl.png', text: '[月亮]' },
      { img: '/baoB/images/emoji/d.png', text: '[刀]' },
      { img: '/baoB/images/emoji/fd1.png', text: '[发抖]' },
      { img: '/baoB/images/emoji/cj.png', text: '[差劲]' },
      { img: '/baoB/images/emoji/qt.png', text: '[拳头]' },
      { img: '/baoB/images/emoji/xsl.png', text: '[心碎了]' },
      { img: '/baoB/images/emoji/ty.png', text: '[太阳]' },
      { img: '/baoB/images/emoji/lw.png', text: '[礼物]' },
      { img: '/baoB/images/emoji/pq.png', text: '[皮球]' },
      { img: '/baoB/images/emoji/kl1.png', text: '[骷髅]' },
      { img: '/baoB/images/emoji/hs.png', text: '[挥手]' },
      { img: '/baoB/images/emoji/sd.png', text: '[闪电]' },
      { img: '/baoB/images/emoji/je.png', text: '[饥饿]' },
      { img: '/baoB/images/emoji/zm.png', text: '[咒骂]' },
      { img: '/baoB/images/emoji/zm1.png', text: '[折磨]' },
      { img: '/baoB/images/emoji/kb.png', text: '[抠鼻]' },
      { img: '/baoB/images/emoji/gz.png', text: '[鼓掌]' },
      { img: '/baoB/images/emoji/qdl.png', text: '[糗大了]' },
      { img: '/baoB/images/emoji/zhh.png', text: '[左哼哼]' },
      { img: '/baoB/images/emoji/dhq.png', text: '[打哈欠]' },
      { img: '/baoB/images/emoji/kkl.png', text: '[快哭了]' },
      { img: '/baoB/images/emoji/x1.png', text: '[吓]' },
      { img: '/baoB/images/emoji/lq.png', text: '[篮球]' },
      { img: '/baoB/images/emoji/pp.png', text: '[乒乓]' },
      { img: '/baoB/images/emoji/[NO]@2x.png', text: '[NO]' },
      { img: '/baoB/images/emoji/tt.png', text: '[跳跳]' },
      { img: '/baoB/images/emoji/oh.png', text: '[怄火]' },
      { img: '/baoB/images/emoji/zq.png', text: '[转圈]' },
      { img: '/baoB/images/emoji/kt.png', text: '[磕头]' },
      { img: '/baoB/images/emoji/ht.png', text: '[回头]' },
      { img: '/baoB/images/emoji/ts.png', text: '[跳绳]' },
      { img: '/baoB/images/emoji/jd.png', text: '[激动]' },
      { img: '/baoB/images/emoji/jw.png', text: '[街舞]' },
      { img: '/baoB/images/emoji/xw.png', text: '[献吻]' },
      { img: '/baoB/images/emoji/ztj.png', text: '[左太极]' },
      { img: '/baoB/images/emoji/ytj.png', text: '[右太极]' },
      { img: '/baoB/images/emoji/bz.png', text: '[闭嘴]' },
      { img: '/baoB/images/emoji/mm.png', text: '[猫咪]' },
      { img: '/baoB/images/emoji/hsx.png', text: '[红双喜]' },
      { img: '/baoB/images/emoji/bp.png', text: '[鞭炮]' },
      { img: '/baoB/images/emoji/hdl.png', text: '[红灯笼]' },
      { img: '/baoB/images/emoji/mj.png', text: '[麻将]' },
      { img: '/baoB/images/emoji/mkf.png', text: '[麦克风]' },
      { img: '/baoB/images/emoji/lpd.png', text: '[礼物袋]' },
      { img: '/baoB/images/emoji/xf.png', text: '[信封]' },
      { img: '/baoB/images/emoji/xq.png', text: '[象棋]' },
      { img: '/baoB/images/emoji/cd.png', text: '[彩带]' },
      { img: '/baoB/images/emoji/lz.png', text: '[蜡烛]' },
      { img: '/baoB/images/emoji/bj.png', text: '[爆筋]' },
      { img: '/baoB/images/emoji/bbt.png', text: '[棒棒糖]' },
      { img: '/baoB/images/emoji/np.png', text: '[奶瓶]' },
      { img: '/baoB/images/emoji/mt.png', text: '[面条]' },
      { img: '/baoB/images/emoji/xj.png', text: '[香蕉]' },
      { img: '/baoB/images/emoji/fj.png', text: '[飞机]' },
      { img: '/baoB/images/emoji/zct.png', text: '[左车头]' },
      { img: '/baoB/images/emoji/cx.png', text: '[车厢]' },
      { img: '/baoB/images/emoji/yct.png', text: '[右车头]' },
      { img: '/baoB/images/emoji/dy1.png', text: '[多云]' },
      { img: '/baoB/images/emoji/xy.png', text: '[下雨]' },
      { img: '/baoB/images/emoji/cp.png', text: '[钞票]' },
      { img: '/baoB/images/emoji/xm.png', text: '[熊猫]' },
      { img: '/baoB/images/emoji/dp.png', text: '[灯泡]' },
      { img: '/baoB/images/emoji/fc.png', text: '[风车]' },
      { img: '/baoB/images/emoji/nz.png', text: '[闹钟]' },
      { img: '/baoB/images/emoji/ys.png', text: '[雨伞]' },
      { img: '/baoB/images/emoji/cq.png', text: '[彩球]' },
      { img: '/baoB/images/emoji/zj.png', text: '[钻戒]' },
      { img: '/baoB/images/emoji/sf.png', text: '[沙发]' },
      { img: '/baoB/images/emoji/zj1.png', text: '[纸巾]' },
      { img: '/baoB/images/emoji/sq.png', text: '[手枪]' },
      { img: '/baoB/images/emoji/qw.png', text: '[青蛙]' },

    ],
    bqlist: {
      '[龇牙]': '/baoB/images/emoji/zy.png',
      '[调皮]': '/baoB/images/emoji/tp.png',
      '[流汗]': '/baoB/images/emoji/lh.png',
      '[偷笑]': '/baoB/images/emoji/tx.png',
      '[再见]': '/baoB/images/emoji/zj2.png',
      '[敲打]': '/baoB/images/emoji/qd.png',
      '[擦汗]': '/baoB/images/emoji/ch.png',
      '[猪头]': '/baoB/images/emoji/zt.png',
      '[玫瑰]': '/baoB/images/emoji/mg.png',
      '[流泪]': '/baoB/images/emoji/ll.png',
      '[大哭]': '/baoB/images/emoji/dk.png',
      '[嘘]': '/baoB/images/emoji/x.png',
      '[酷]': '/baoB/images/emoji/k.png',
      '[抓狂]': '/baoB/images/emoji/zk.png',
      '[委屈]': '/baoB/images/emoji/wq.png',
      '[便便]': '/baoB/images/emoji/bb.png',
      '[炸弹]': '/baoB/images/emoji/zd.png',
      '[菜刀]': '/baoB/images/emoji/cd1.png',
      '[可爱]': '/baoB/images/emoji/ka.png',
      '[色]': '/baoB/images/emoji/s1.png',
      '[害羞]': '/baoB/images/emoji/hx.png',
      '[得意]': '/baoB/images/emoji/dy.png',
      '[吐]': '/baoB/images/emoji/t.png',
      '[微笑]': '/baoB/images/emoji/wx.png',
      '[怒]': '/baoB/images/emoji/n.png',
      '[尴尬]': '/baoB/images/emoji/gg.png',
      '[惊恐]': '/baoB/images/emoji/jk.png',
      '[冷汗]': '/baoB/images/emoji/lh1.png',
      '[爱心]': '/baoB/images/emoji/ax.png',
      '[示爱]': '/baoB/images/emoji/sa.png',
      '[白眼]': '/baoB/images/emoji/by.png',
      '[傲慢]': '/baoB/images/emoji/am.png',
      '[难过]': '/baoB/images/emoji/ng.png',
      '[惊讶]': '/baoB/images/emoji/jy.png',
      '[疑问]': '/baoB/images/emoji/yw.png',
      '[困]': '/baoB/images/emoji/k1.png',
      '[么么哒]': '/baoB/images/emoji/mmd.png',
      '[憨笑]': '/baoB/images/emoji/hx1.png',
      '[爱情]': '/baoB/images/emoji/aq.png',
      '[衰]': '/baoB/images/emoji/s.png',
      '[撇嘴]': '/baoB/images/emoji/pz.png',
      '[阴险]': '/baoB/images/emoji/yx.png',
      '[奋斗]': '/baoB/images/emoji/fd2.png',
      '[发呆]': '/baoB/images/emoji/fd.png',
      '[右哼哼]': '/baoB/images/emoji/yhh.png',
      '[抱抱]': '/baoB/images/emoji/bb.png',
      '[坏笑]': '/baoB/images/emoji/hx2.png',
      '[飞吻]': '/baoB/images/emoji/fw.png',
      '[鄙视]': '/baoB/images/emoji/bs.png',
      '[晕]': '/baoB/images/emoji/y.png',
      '[大兵]': '/baoB/images/emoji/db.png',
      '[可怜]': '/baoB/images/emoji/kl.png',
      '[强]': '/baoB/images/emoji/q.png',
      '[弱]': '/baoB/images/emoji/r.png',
      '[握手]': '/baoB/images/emoji/ws.png',
      '[胜利]': '/baoB/images/emoji/sl.png',
      '[抱拳]': '/baoB/images/emoji/bq.png',
      '[凋谢]': '/baoB/images/emoji/dl.png',
      '[米饭]': '/baoB/images/emoji/mf.png',
      '[蛋糕]': '/baoB/images/emoji/dg.png',
      '[西瓜]': '/baoB/images/emoji/xg.png',
      '[啤酒]': '/baoB/images/emoji/pj.png',
      '[瓢虫]': '/baoB/images/emoji/pc.png',
      '[勾引]': '/baoB/images/emoji/gy.png',
      '[OK]': '/baoB/images/emoji/[OK]@2x.png',
      '[爱你]': '/baoB/images/emoji/an.png',
      '[咖啡]': '/baoB/images/emoji/kf.png',
      '[月亮]': '/baoB/images/emoji/yl.png',
      '[刀]': '/baoB/images/emoji/d.png',
      '[发抖]': '/baoB/images/emoji/fd1.png',
      '[差劲]': '/baoB/images/emoji/cj.png',
      '[拳头]': '/baoB/images/emoji/qt.png',
      '[心碎了]': '/baoB/images/emoji/xsl.png',
      '[太阳]': '/baoB/images/emoji/ty.png',
      '[礼物]': '/baoB/images/emoji/lw.png',
      '[皮球]': '/baoB/images/emoji/pq.png',
      '[骷髅]': '/baoB/images/emoji/kl1.png',
      '[挥手]': '/baoB/images/emoji/hs.png',
      '[闪电]': '/baoB/images/emoji/sd.png',
      '[饥饿]': '/baoB/images/emoji/je.png',
      '[咒骂]': '/baoB/images/emoji/zm.png',
      '[折磨]': '/baoB/images/emoji/zm1.png',
      '[抠鼻]': '/baoB/images/emoji/kb.png',
      '[鼓掌]': '/baoB/images/emoji/gz.png',
      '[糗大了]': '/baoB/images/emoji/qdl.png',
      '[左哼哼]': '/baoB/images/emoji/zhh.png',
      '[打哈欠]': '/baoB/images/emoji/dhq.png',
      '[快哭了]': '/baoB/images/emoji/kkl.png',
      '[吓]': '/baoB/images/emoji/x1.png',
      '[篮球]': '/baoB/images/emoji/lq.png',
      '[乒乓]': '/baoB/images/emoji/pp.png',
      '[NO]': '/baoB/images/emoji/[NO]@2x.png',
      '[跳跳]': '/baoB/images/emoji/tt.png',
      '[怄火]': '/baoB/images/emoji/oh.png',
      '[转圈]': '/baoB/images/emoji/zq.png',
      '[磕头]': '/baoB/images/emoji/kt.png',
      '[回头]': '/baoB/images/emoji/ht.png',
      '[跳绳]': '/baoB/images/emoji/ts.png',
      '[激动]': '/baoB/images/emoji/jd.png',
      '[街舞]': '/baoB/images/emoji/jw.png',
      '[献吻]': '/baoB/images/emoji/xw.png',
      '[左太极]': '/baoB/images/emoji/ztj.png',
      '[右太极]': '/baoB/images/emoji/ytj.png',
      '[闭嘴]': '/baoB/images/emoji/bz.png',
      '[猫咪]': '/baoB/images/emoji/mm.png',
      '[红双喜]': '/baoB/images/emoji/hsx.png',
      '[鞭炮]': '/baoB/images/emoji/bp.png',
      '[红灯笼]': '/baoB/images/emoji/hdl.png',
      '[麻将]': '/baoB/images/emoji/mj.png',
      '[麦克风]': '/baoB/images/emoji/mkf.png',
      '[礼物袋]': '/baoB/images/emoji/lpd.png',
      '[信封]': '/baoB/images/emoji/xf.png',
      '[象棋]': '/baoB/images/emoji/xq.png',
      '[彩带]': '/baoB/images/emoji/cd.png',
      '[蜡烛]': '/baoB/images/emoji/lz.png',
      '[爆筋]': '/baoB/images/emoji/bj.png',
      '[棒棒糖]': '/baoB/images/emoji/bbt.png',
      '[奶瓶]': '/baoB/images/emoji/np.png',
      '[面条]': '/baoB/images/emoji/mt.png',
      '[香蕉]': '/baoB/images/emoji/xj.png',
      '[飞机]': '/baoB/images/emoji/fj.png',
      '[左车头]': '/baoB/images/emoji/zct.png',
      '[车厢]': '/baoB/images/emoji/cx.png',
      '[右车头]': '/baoB/images/emoji/yct.png',
      '[多云]': '/baoB/images/emoji/dy1.png',
      '[下雨]': '/baoB/images/emoji/xy.png',
      '[钞票]': '/baoB/images/emoji/cp.png',
      '[熊猫]': '/baoB/images/emoji/xm.png',
      '[灯泡]': '/baoB/images/emoji/dp.png',
      '[风车]': '/baoB/images/emoji/fc.png',
      '[闹钟]': '/baoB/images/emoji/nz.png',
      '[雨伞]': '/baoB/images/emoji/ys.png',
      '[彩球]': '/baoB/images/emoji/cq.png',
      '[钻戒]': '/baoB/images/emoji/zj.png',
      '[沙发]': '/baoB/images/emoji/sf.png',
      '[纸巾]': '/baoB/images/emoji/zj1.png',
      '[手枪]': '/baoB/images/emoji/sq.png',
      '[青蛙]': '/baoB/images/emoji/qw.png',

    },

  },
  bigimg(e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  xuanimgpai() {
    wx.showLoading({
      title: '发送中',
    })
    var _this = this;
    var msglist = this.data.msglist;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'],
      success: resss => {
        console.log(resss)
        _this.setData({
          imgtype: true
        })
        if (resss.tempFiles[0].size >= 1024 * 1024) {
          wx.showToast({
            title: '图片过大,请重新选择',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        let message = tim.createImageMessage({
          to: _this.data.selToID,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: { file: resss },
          onProgress: function (event) { console.log('file uploading:', event) }
        });
        let promise = tim.sendMessage(message);
        promise.then(function (imResponse) {
          console.log(imResponse.data.message)
          imResponse.data.message = _this.addMsg(imResponse.data.message)
          msglist.push(imResponse.data.message)
          _this.setData({
            msglist: msglist,
          })
          wx.hideLoading();
          console.log(msglist);
          setTimeout(function () {
            _this.tobottom();
          }, 500)
        }).catch(function (imError) {
          // 发送失败
          wx.hideLoading()
          console.log(imError)
        });

      },
    })
  },
  xuanimg() {
    wx.showLoading({
      title: '发送中',
    })
    var _this = this;
    var msglist = this.data.msglist;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      success: resss => {
        console.log(resss)
        _this.setData({
          imgtype: true
        })
        if (resss.tempFiles[0].size >= 1024 * 1024) {
          wx.showToast({
            title: '图片过大,请重新选择',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        let message = tim.createImageMessage({
          to: _this.data.selToID,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: { file: resss },
          onProgress: function (event) { console.log('file uploading:', event) }
        });
        let promise = tim.sendMessage(message);
        promise.then(function (imResponse) {
          imResponse.data.message = _this.addMsg(imResponse.data.message)
          msglist.push(imResponse.data.message)
          _this.setData({
            msglist: msglist,
          })
          wx.hideLoading();
          console.log(msglist);
          setTimeout(function () {
            _this.tobottom();
          }, 500)
        }).catch(function (imError) {
          // 发送失败
          wx.hideLoading()
          wx.showToast({
            title: '发送失败',
            icon: 'none',
            duration: '1500'
          })
        });
      },
    })
  },
  //关闭框
  choose() {
    this.setData({
      bqtype: true,
      imgtype: true,
    })
  },
  tanbiaoqing() {
    var _this = this;
    this.setData({
      bqtype: !_this.data.bqtype,
      imgtype: true,
    })
  },
  tanimg() {
    var _this = this;
    this.setData({
      bqtype: true,
      imgtype: !_this.data.imgtype,
    })
  },
  //获取输入内容
  getContent: function (e) {
    var that = this;
    if (e.detail.value) {
      var type = true
    } else {
      var type = false
    }
    console
    that.setData({
      content: e.detail.value,
      type: type
    })
  },

  //解析消息
  addMsg(msg) {
    var _this = this;
    if (msg.flow == 'out') {
      msg.headimg = wx.getStorageSync('userInfo').avatarUrl;
      msg.nickname = wx.getStorageSync('userInfo').nickName;
    } else {
      msg.nickname = _this.data.friendName;
      msg.headimg = _this.data.friendAvatarUrl;
    }
    var msgTime = msg.time;
    var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    var thisdate;
    var d = new Date(msgTime * 1000); //根据时间戳生成的时间对象
    var min = d.getMinutes();
    var hour = d.getHours();
    //得到时和分，分小于10时，只返回一位数
    if (min < 10) {
      min = "0" + min;
    }
    //得到月份和天  月份一般是从0开始，所以展示出来要+1
    var month = d.getMonth();

    var day = d.getDate();
    //得到时间   当天时间应该只显示时分  当天以前显示日期+时间
    if (timeStamp > msgTime) {
      thisdate = month + 1 + "-" + day + " " + hour + ":" + min;
    } else {
      thisdate = hour + ":" + min;
    }
    msg.time = thisdate;
    if (msg.type == "TIMTextElem") {
      let renderDom = [];
      let temp = msg.payload.text
      let left = -1
      let right = -1
      var bqlist = _this.data.bqlist;
      while (temp !== '') {
        left = temp.indexOf('[')
        right = temp.indexOf(']')
        switch (left) {
          case 0:
            if (right === -1) {
              renderDom.push({
                name: 'text',
                text: temp
              })
              temp = ''
            } else {
              let _emoji = temp.slice(0, right + 1)
              if (bqlist[_emoji]) {    // 如果您需要渲染表情包，需要进行匹配您对应[呲牙]的表情包地址
                renderDom.push({
                  name: 'img',
                  src: bqlist[_emoji]
                })
                temp = temp.substring(right + 1)
              } else {
                renderDom.push({
                  name: 'text',
                  text: '['
                })
                temp = temp.slice(1)
              }
            }
            break
          case -1:
            renderDom.push({
              name: 'text',
              text: temp
            })
            temp = ''
            break
          default:
            renderDom.push({
              name: 'text',
              text: temp.slice(0, left)
            })
            temp = temp.substring(left)
            break
        }
      }
      msg.payload.text = renderDom
    }
    if (msg.type == "TIMSoundElem") {
      msg.payload.text = '收到一条语音消息，请前往app查看'
    }
    if (msg.type == "TIMFaceElem") {
      msg.payload.text = _this.data.bqlist[msg.payload.data]
    }
    return msg;
  },
  subbq(e) {
    var text = e.currentTarget.dataset.text;
    var _this = this;
    var selToID = this.data.selToID;
    var msglist = this.data.msglist;
    // var friendHeadUrl = this.data.friendAvatarUrl;
    // var selType = webim.SESSION_TYPE.C2C;
    let message = tim.createTextMessage({
      to: selToID,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: text,
      }
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message);
		console.log(promise);
    // promise.then(function (imResponse) {
    //   // 发送成功
    //   imResponse.data.message = _this.addMsg(imResponse.data.message)
    //   msglist.push(imResponse.data.message)
    //   _this.setData({
    //     msglist: msglist,
    //     bqtype: true
    //   })
    //   console.log(msglist);
    //   setTimeout(function () {
    //     _this.tobottom();
    //   }, 500)
    // }).catch(function (imError) {
    //   // 发送失败
    //   console.warn('sendMessage error:', imError);
    // });
  },
  onSendMsg() {
    var _this = this;
    var selToID = this.data.selToID;
    var content = this.data.content;
    var msglist = this.data.msglist;
    // var friendHeadUrl = this.data.friendAvatarUrl;
    // var selType = webim.SESSION_TYPE.C2C;
    let message = tim.createTextMessage({
      to: selToID,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: content,
      }
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      imResponse.data.message = _this.addMsg(imResponse.data.message)
      msglist.push(imResponse.data.message)
      _this.setData({
        msglist: msglist,
        content: '',
        type: false
      })
      console.log(msglist);
      setTimeout(function () {
        _this.tobottom();
      }, 500)
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });

  },


  webimLogin() {
    var _this = this
    let promise = tim.login({ userID: wx.getStorageSync('userid'), userSig: wx.getStorageSync('rctoken') });
    promise.then(function (imResponse) {
      console.log(imResponse.data); // 登录成功
      console.log('成功')
      if (_this.data.isstart == false) {
        _this.data.isstart = true
        setTimeout(function () {
          _this.getlishi();
        }, 500)
      }
    }).catch(function (imError) {
      console.warn('login error:', imError); // 登录失败的相关信息
    });
    let onMessageReceived = function (event) {
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log('运行')
      console.log(event)
      if (_this.data.isbegin == true && event.data[0].from == _this.data.friendId) {
        var msglist = _this.data.msglist;
        event.data[0] = _this.addMsg(event.data[0]);
        msglist.push(event.data[0])

        _this.setData({
          msglist: msglist
        })
        setTimeout(function () {
          _this.tobottom();
        }, 500)
      }

    };
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    this.data.jiantingobj = onMessageReceived
    this.setData({
      jiantingobj: onMessageReceived
    })

    // var loginInfo = {
    //   'sdkAppID': '1400205994',//用户标识接入SDK的应用ID，必填。（这个可以在腾讯云的后台管理看到）
    //   'appIDAt3rd': '1400205994',//App 用户使用 OAuth 授权体系分配的 Appid，必填    （这个其实和上面那个是一样的）
    //   'identifier': wx.getStorageSync('userid'),//用户帐号，必填   （这个就是自己服务器里，每个用户的账号，可以自己设置）
    //   'identifierNick': wx.getStorageSync('userInfo').nickName,
    //   'accountType': 1,
    //   'userSig': wx.getStorageSync('rctoken') //鉴权 Token，identifier 不为空时，必填   我觉得这个也是必填的，这个需要在一开始就从后端获取。
    // }
    // //监听事件
    // var listeners = {
    //   "onConnNotify": _this.onConnNotify//监听连接状态回调变化事件，选填
    //   , "onMsgNotify": _this.onMsgNotify//监听新消息（私聊，普通群（非直播聊天室）消息，全员推送消息）事件，必填
    // };
    // //其他对象，选填
    // var options = {
    //   'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
    //   'isLogOn': true //是否开启控制台打印日志,默认开启，选填
    // };

    // webim.login(loginInfo, listeners, options, function (resp) {
    //   loginInfo.identifierNick = _this.chatName2; //设置当前用户昵称
    //   console.log("登录成功", loginInfo, listeners, options);
    // }, function (err) {
    //   console.log("登录失败------------------", loginInfo, listeners, options);
    // });
    // var selToID = this.data.selToID;
    // var selType = webim.SESSION_TYPE.C2C;
    // var selSess = webim.MsgStore.sessByTypeId(selType, selToID);
    // if(selSess){
    //   this.setData({
    //     selSess: selSess
    //   })
    // }


  },
  getlishi() {
    var _this = this;
    console.log(_this.data.selToID)
    let promise = tim.getMessageList({ conversationID: "C2C" + _this.data.selToID, count: 10 });
    promise.then(function (imResponse) {
      var messageList = imResponse.data.messageList; // 消息列表。
      // const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      // const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      if (_this.data.isbegin == false) {
        for (var i in messageList) {
          messageList[i] = _this.addMsg(messageList[i]);
        }
      }
      console.log(messageList)
      _this.setData({
        msglist: messageList,
        isbegin: true,
      })
      setTimeout(function () {
        _this.tobottom();
      }, 500)
      wx.hideLoading()
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // wx.showLoading({
    //   title: '加载中',
    // })
    var that = this;
    if (options) { // 设置会话列表传参过来的好友id

      that.setData({
        selToID: options.friendId,
        friendId: options.friendId,
        friendName: options.friendName,
        friendAvatarUrl: options.friendAvatarUrl,
          // selToID: '2987a15c14144080b6f3fa30a9371ee5',
          // friendId: '2987a15c14144080b6f3fa30a9371ee5',
          // friendName: '王倩',
          // friendAvatarUrl: 'https://shop.zjguangxuan.com/userfiles/2019062311/2019062311443283DeWj.jpg'

      })
      wx.setNavigationBarTitle({
        // title: options.friendName
        title: this.data.friendName
      })
      // wx.showLoading({
      //   title: '加载中',
      // })
      // setTimeout(function(){
      //   that.getlishi();
      // },1000)

    }


  },
  pageScrollToBottom: function () {

    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().windowWidth;
    var height = height / ((width * 2) / 750);
    // console.log(height)
    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      if (rect) {
        // console.log(rect)
        that.setData({
          windowHeight: height,
          // scrollTop:  10000,
        })

      }
    }).exec()
  },
  tobottom() {
    this.setData({
      id: 'bottom'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    var height = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().windowWidth;
    var height = height / ((width * 2) / 750);

    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      if (rect) {
         console.log(rect)
        that.setData({
          windowHeight: height,
          // scrollTop:  10000,
        })

      }
    }).exec()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    console.log(11111111111111111111)
    this.webimLogin();
    var list = this.data.bqqlist;
    var length = Math.ceil(list.length / 21)
    console.log(length)
    this.setData({
      length: length
    })
    setTimeout(function () {
      _this.tobottom();
    }, 500)



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var _this = this;
    tim.off(TIM.EVENT.MESSAGE_RECEIVED, _this.data.jiantingobj);
    tim.setMessageRead({ conversationID: "C2C" + _this.data.selToID });
    // let promise = tim.logout();
    // promise.then(function (imResponse) {
    //   console.log(imResponse.data); // 登出成功
    // }).catch(function (imError) {
    //   console.warn('logout error:', imError);
    // });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var _this = this;
    tim.off(TIM.EVENT.MESSAGE_RECEIVED, _this.data.jiantingobj);
    tim.setMessageRead({ conversationID: "C2C" + _this.data.selToID });
    let promise = tim.logout();
    promise.then(function (imResponse) {
      console.log(imResponse.data); // 登出成功
    }).catch(function (imError) {
      console.warn('logout error:', imError);
    });
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