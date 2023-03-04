/* eslint-disable */
var isJweixin = false,
  isTrue = true,
  wxType = {},
  wx,
  _domain = function() {
    if (/\.cekid\.com/i.test(document.domain)) {
      return 'cekid'
    } else {
      return 'haiziwang'
    }
  },
  _protocol = function() {
    if (/^https/i.test(window.location.href)) {
      return 'https:'
    } else {
      return 'http:'
    }
  },
  baseUrl = _protocol() + '//wxapi.' + _domain() + '.com/',
  extend = function(a, b) {
    var i = ''
    b = b || {}
    for (i in b) {
      a[i] = b[i]
    }
    return a
  },
  options = {
    imgUrl: '',
    link: '',
    title: '',
    desc: '',
    success: function() {},
    cancel: function() {},
  },
  qrCodeOpt = {
    needResult: 0,
    scanType: ['qrCode', 'barCode'],
    success: function(res) {},
  },
  locationOpt = {
    type: 'wgs84',
    success: function(res) {},
  },
  menuItemsOpt = {
    menuList: [],
  },
  wechatType = function(num) {
    var time = new Date().getTime()
    if (num == '' || num === 1) {
      return {
        appId: 'wx859298189287ef1e',
        getsignatureUrl:
          baseUrl +
          'hzw_club/js/signature?url=' +
          encodeURIComponent(location.href.split('#')[0]) +
          '&t=' +
          time,
      }
    } else if (num === 2) {
      return {
        appId: 'wxd514c5fac3add38c',
        getsignatureUrl:
          baseUrl +
          'hzw_main/js/signature?url=' +
          encodeURIComponent(location.href.split('#')[0]) +
          '&t=' +
          time,
      }
    } else {
      return {
        appId: 'wx6cd0b9102f591a7b',
        getsignatureUrl:
          baseUrl +
          'test/js/signature?url=' +
          encodeURIComponent(location.href.split('#')[0]) +
          '&t=' +
          time,
      }
    }
  },
  appendWx = function(callback) {
    if (!wx && !isJweixin) {
      var s = document.createElement('script')
      var s0 = document.getElementsByTagName('script')[0]
      s.src = '//res.wx.qq.com/open/js/jweixin-1.4.0.js'
      s0.parentNode.insertBefore(s, s0)
      s.onload = function() {
        isJweixin = true
        wx = window.wx
        callback && callback(wx)
      }
    }
  },
  getSignature = function(wx, callback) {
    if (isTrue) {
      isTrue = false
      var ajax = new XMLHttpRequest()
      ajax.open('GET', wxType.getsignatureUrl, true)
      ajax.send(null)
      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var data = function() {
            var Fn = Function
            return new Fn('return ' + ajax.responseText)()
          }
          wx.config({
            debug: false,
            appId: wxType.appId,
            timestamp: data().timestamp,
            nonceStr: data().noncestr,
            signature: data().signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareQZone',
              'onMenuShareWeibo',
              'scanQRCode',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'addCard',
              'chooseCard',
              'openCard',
            ],
          })
          callback && callback()
          isTrue = false
        } else {
          isTrue = true
        }
      }
    } else {
      callback && callback()
    }
  },
  init = function(callback) {
    if (!window.wx && !wx) {
      appendWx(function(wx) {
        getSignature(wx, callback)
      })
    } else {
      getSignature(wx, callback)
    }
  },
  wechatShare = {
    wx: wx,
    isWechat: function() {
      return /MicroMessenger/i.test(navigator.userAgent)
    },
    ready: function(arg, num, callback) {
      if (!this.isWechat()) {
        return
      }

      options = extend(options, arg || {})
      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.onMenuShareTimeline(options)
          wx.onMenuShareAppMessage(options)
          wx.onMenuShareQQ(options)
          wx.onMenuShareQZone(options)
          wx.onMenuShareWeibo(options)
        })
        callback && callback(wx)
      })
    },
    scanQRCode: function(arg, num, callback) {
      if (!this.isWechat()) {
        return
      }

      qrCodeOpt = extend(qrCodeOpt, arg || {})
      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.scanQRCode(qrCodeOpt)
        })
        callback && callback(wx)
      })
    },
    getLocation: function(arg, num, callback) {
      if (!this.isWechat()) {
        return
      }

      locationOpt = extend(locationOpt, arg || {})
      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.getLocation(locationOpt)
        })
        callback && callback(wx)
      })
    },
    hideMenuItems: function(arg, num, callback) {
      if (!this.isWechat()) {
        return
      }

      menuItemsOpt = extend(menuItemsOpt, arg || {})
      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.hideMenuItems(menuItemsOpt)
        })
        callback && callback(wx)
      })
    },
    showMenuItems: function(arg, num, callback) {
      if (!this.isWechat()) {
        return
      }

      menuItemsOpt = extend(menuItemsOpt, arg || {})
      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.showMenuItems(menuItemsOpt)
        })
        callback && callback(wx)
      })
    },
    hideAllNonBaseMenuItem: function(num, callback) {
      if (!this.isWechat()) {
        return
      }

      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.hideAllNonBaseMenuItem()
        })
        callback && callback(wx)
      })
    },
    showAllNonBaseMenuItem: function(num, callback) {
      if (!this.isWechat()) {
        return
      }

      wxType = wechatType(num || '')

      init(function() {
        wx.ready(function() {
          wx.showAllNonBaseMenuItem()
        })
        callback && callback(wx)
      })
    },
    _ready: function(num, _callback) {
      if (!this.isWechat()) {
        return
      }
      wxType = wechatType(num || '')
      init(function() {
        wx.ready(function() {
          _callback && _callback(wx)
        })
      })
    },
  }

export default wechatShare
