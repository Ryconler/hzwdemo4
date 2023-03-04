import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import _ from 'lodash'
const moment = require('moment')
const wx = require('weixin-js-sdk')

import { getNameById } from '../api/address'
import { getCityCode, getAMapConvertLocation } from '../api/common'
import { JSONStringify } from 'lib/tool'

export function secureRegExp(str: string = ''): RegExp {
  try {
    return new RegExp(str)
  } catch (e) {
    console.error('new RegExp Error', e)
    return /(?:)/
  }
}

export const isInteger = (obj: number) => {
  return typeof obj === 'number' && obj % 1 === 0
}

export function isUrl(path: any) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export function getDataFromCookies(key: string, isBase64: boolean = true) {
  let data = Cookies.get(key)
  if (data === undefined) {
    data = ''
  }
  if (isBase64 === true) {
    return Base64.decode(data)
  } else {
    return data
  }
}

export function getValueFromHistoryState(history: any, key: any) {
  const { location } = history
  return _.get(location.state, key)
}

export function getValueFromMatchParams(match: any, key: any) {
  const { params } = match
  return _.get(params, key)
}

export function isEmpty(o: any) {
  return o === '' || o === null || o === undefined
}

// 数据脱敏处理
export function desensitize(value: string | number) {
  const strVal = value + ''
  if (isEmpty(strVal)) {
    return ''
  } else if (strVal.length === 1) {
    return '***'
  } else if (strVal.length === 2) {
    return strVal.substring(0, 1) + '***'
  } else if (strVal.length === 3) {
    return strVal.substring(0, 1) + '***' + strVal.substring(2)
  } else {
    return strVal.substring(0, 1) + '***' + strVal.substring(strVal.length - 2)
  }
}

export const removeCookies = () => {
  const cookies = Cookies.get()
  for (const key in cookies) {
    Cookies.remove(key, {
      domain: '.haiziwang.com',
    })
  }
}

export function getScrollTop() {
  // 获取滚轮滚动的距离,适配所有的浏览器
  const supportPageOffset = window.pageXOffset !== undefined // 判断是否支持pageXOffset
  if (supportPageOffset) {
    return window.pageYOffset
  } else if (document.compatMode === 'BackCompat') {
    // 混杂模式
    return document.body.scrollTop
  } else if (document.compatMode === 'CSS1Compat') {
    // 标准模式
    return document.documentElement.scrollTop
  } else {
    return 0
  }
}

export function getClientHeight() {
  // 网页可见区域高
  if (document.compatMode === 'BackCompat') {
    // 混杂模式
    return document.body.clientHeight
  } else if (document.compatMode === 'CSS1Compat') {
    // 标准模式
    return document.documentElement.clientHeight
  } else {
    return 0
  }
}

export function getScrollHeight() {
  // 内容高度, 包含被overflow隐藏掉的部分, 包含padding, 不包含margin
  if (document.compatMode === 'BackCompat') {
    // 混杂模式
    return document.body.scrollHeight
  } else if (document.compatMode === 'CSS1Compat') {
    // 标准模式
    return document.documentElement.scrollHeight
  } else {
    return 0
  }
}

export function px(px: any) {
  const w = Math.min(
    document.documentElement.getBoundingClientRect().width,
    500
  )
  return (w * px) / 750
}

export function closest(el: any, selector: any) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

export function fixedBody() {
  const scrollTop = getScrollTop()
  document.body.style.cssText += 'position:fixedtop:-' + scrollTop + 'px'
}

export function looseBody() {
  const body = document.body
  body.style.position = ''
  const top: any = body.style.top
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
  body.style.top = ''
}

export function isRKHYAPP() {
  const source = Cookies.get('source')
  const apptype = Cookies.get('apptype')
  return (source === 'android' || source === 'ios') && apptype === 'rkhy'
}

export const isApp = () => {
  const source:string = Cookies.get('source') || ''
  return ['ios', 'android'].indexOf(source) > -1
}

// 判断是否IOS
export function isIOS() {
  const source = Cookies.get('source')
  return source === 'ios'
}

// 判断是否是安卓
export function isAndroid() {
  const source = Cookies.get('source')
  return source === 'android'
}

// 获取设备环境
export function getDevice():string|number {
  const ua = navigator.userAgent
  const src = Cookies.get('source')
  if (src === 'ios') {
    return 'ios'
  } else if (src === 'android') {
    return 'android'
  } else if (/MicroMessenger/i.test(ua)) {
    return 'weixin'
  } else if (/Mobile/i.test(ua)) {
    return 'mobile'
  }
  return 'other'
}

const onReady = (callback: any) => {
  window.kwapp &&
    window.kwapp.onReady(() => {
      callback && callback()
    })
}

const getAppNativeLocation = () => {
  let lat = ''
  let lng = ''
  if (isAndroid()) {
    const location = JSON.parse(window.localjs.getdinfo())
    lat = location['7']
    lng = location['8']
  } else if (isIOS()) {
    const location = JSON.parse(window.app.jsNavtiveSyncHandle('{\"targetClass\":\"KTemaiJsConfig\",\"methodType\":\"1\",\"methodName\":\"getdinfo\",\"parm\":[]}'))
    lat = location['7']
    lng = location['8']
  }
  console.log('native location', `${lng},${lat}`)
  return { lat, lng }
}

// 获取城市id和城市名
export const getCity = async (params?:any) => {
  const cityInfo:any = {}
  cityInfo.cityCode =  '320100'
  cityInfo.cityName = '南京'
  return cityInfo
}
//图文分享
export const share = (config = {}) => {
  if(isApp()) {
    const conf = {
      title: '孩子王互动活动',
      desc: '孩子王，陪伴妈妈&孩子们一同成长',
      imgUrl: 'http://st.haiziwang.com/static/life/r/icon_logo.png',
      link: location.href,
      // 以下孩子王独有
      promotion: '', // 促销语
      imageByte: '', // 如果非空，则作为图片分享，必须是图片二进制/Base64编码
      kwsharescenetype: '', // 获取分享 key 的 type
      linkid: '', // 获取分享 key 的 linkid
      subtext: '', // subtext (sub 文本，价格、价格区间等)
      label: '', // 标签
      showQrCode: 0, // 是否显示二维码
      ...config
    }
    console.log(conf)
    window.getAppShareInfo = () => conf
  }
}

// 设置页面标题和是否支持刷新分享
export const setPageInfo = (title: string, refresh = false, share = false) => {
  // document.title = title
  if (window.kwapp) {
    window.kwapp.onReady(() => {
      window.kwapp.allowRefreshOrShare(refresh, share)
    })
    window.kwapp.setTitle(title)
    document.title = title
    window.kwapp.allowRefreshOrShare(refresh, share)
    setTimeout(() => {
      window.kwapp.setTitle(title)
      window.kwapp.allowRefreshOrShare(refresh, share)
    }, 500)
  }
  // const shareObj = {
  //   userName: 'gh_362b01c44275',
  //   path: 'http://dev.haiziwang.com:3000',
  //   mpType: 2, //TODO  0正式版;1开发版;2体验版;
  // }
  // window.getAppShareInfo = () => shareObj
}

// 时间戳获取周几
export const getWeek = (val: string) => {
  let weekStr: string
  switch (val) {
    case '1':
      weekStr = '周一'
      break
    case '2':
      weekStr = '周二'
      break
    case '3':
      weekStr = '周三'
      break
    case '4':
      weekStr = '周四'
      break
    case '5':
      weekStr = '周五'
      break
    case '6':
      weekStr = '周六'
      break
    case '7':
      weekStr = '周日'
      break
    default:
      weekStr = ''
      break
  }
  return weekStr
}

// 获取url中全部参数的对象
export const getUrlAllParams = (url: string) => {
  // 解决乱码问题
  const res: any = {}
  const url_data =
    _.split(url, '?').length > 1
      ? _.split(url, '?')[1]
      : null
  // console.log(url_data)
  if (!url_data) return null
  const params_arr = _.split(url_data, '&')
  _.forEach(params_arr, function (item) {
    const key = _.split(decodeURIComponent(item), '=')[0]
    const value = _.split(decodeURIComponent(item), '=')[1]
    res[key] = value
  })
  return res
}

function setNativeInfo(options: any) {
  options = options || {}
  options.targetClass = options.targetClass || ''
  options.methodType = options.methodType || '0'
  options.methodName = options.methodName || ''
  options.methodArgsTypes = options.methodArgsTypes || ''
  options.parm = options.parm || []
  const str = JSON.stringify(options)
  if (isIOS() && window.app && window.app.jsNavtiveSyncHandle) {
    // alert(window.app.jsNavtiveSyncHandle(str))
    return window.app.jsNavtiveSyncHandle(str)
  } else if (window.localjs && window.localjs.invokeNativeSyncMethod) {
    // alert(window.localjs.invokeNativeSyncMethod(str))
    return window.localjs.invokeNativeSyncMethod(str)
  }
  return null
}
let resaultObj: any

export const callAppInterface = () => {
  if (isIOS()) {
    const param = {
      targetClass: 'KTemaiJsConfig',
      methodType: 1,
      methodName: 'selectOverallAddress'
    }
    const r = setNativeInfo(param)
    // if ( +r === 1) {
    //   resaultObj = {type: 1, msg:msg || ''}
    // } else if ( +r === 0 ) {
    //   resaultObj = {type: 2}
    // }
  } else if (isAndroid()) {
    const param = {
      targetClass: 'com.kidswant.component.h5.HZWJsHandler',
      methodType: '0',
      methodArgsTypes: 't,b',
      methodName: 'getGlobalAddress',
    }
    const r = setNativeInfo(param)
    // if ( +r === 1) {
    //   resaultObj = {type: 1, msg:msg || ''}
    // } else if ( +r === 0 ) {
    //   resaultObj = {type: 2}
    // }
  } else {
    // resaultObj = {type: 1, msg:msg || ''}
    resaultObj = {}
  }
}

function getLocation() {
  return new Promise((resolve:any, reject:any) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res:any) {
        // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed; // 速度，以米/每秒计
        // var accuracy = res.accuracy; // 位置精度
        // console.log('weixin', res)
        resolve(res)
      },
      fail: (res:any) => {
        console.log('fail', res)
        reject(res)
      },
      complete: () => {
        console.log('complete')
      }
    })
  })
}

// 获取小程序环境
async function getWxEnv(){
  return new Promise((resolve:any, reject:any) => {
    wx.miniProgram.getEnv((res:any) => {
      if (res.miniprogram) {
        resolve('miniprogram')
      } else {
        resolve('wechat')
      }
    })
  })
}
export const isWeixin = /MicroMessenger/i.test(navigator.userAgent)
export const isMiniprogram = async () => isWeixin && (await getWxEnv()) === 'miniprogram'
export const isLuckyChina = async () => Cookies.get('miniprogramid') == 'wx09a5336efa0e5680' && (await isMiniprogram())

// 经纬度
export const getPosition = async () => {
  // // console.log('window.localjs', window.localjs)
  // const str = getDevice()
  // if(await isMiniprogram()) {
  //   try{
  //     const res:any = await getLocation()
  //     return { lng: res.longitude || '', lat: res.latitude || '' }
  //   } catch(e) {
  //     return { lng: '', lat: '' }
  //   }
    
  // } else if(str === 'ios') {
  //   const objStr = window.app?.jsNavtiveSyncHandle(
  //     '{"targetClass":"KTemaiJsConfig","methodType":"1","methodName":"getdinfo","parm":[]}'
  //   )
  //   if (objStr) {
  //     const obj = JSON.parse(objStr)
  //     return { lng: obj['7'], lat: obj['8'] }
  //   } else {
  //     return { lng: '', lat: '' }
  //   }
  // } else if(str === 'android' && window.localjs && window.localjs.getKwGps) {
  //   const info = window.localjs.getKwGps()
  //   if(info) {
  //     const arr = info.split('_')
  //     return {lng: arr[1], lat: arr[0]}
  //   } else {
  //     return { lng: '', lat: '' }
  //   }
  // } else {
  //   return { lng: '', lat: '' }
  // }
  
  return getPositionNew()
}

const getPositionNew = async () => {
  const lat = ''
  const lng = ''
  return { lat, lng }
}

// 根据时间戳或者时间字符串返回本周、下周、日期三种时间格式
export const timeFormat = (str: string | number) => {
  let time: string = ''
  const currentWeek = moment().format('W')
  const actWeek = moment(str).format('W')
  const tet = 14 - moment().format('E')
  // console.log(currentWeek)
  // console.log(actWeek)
  if (str) {
    if (moment().isAfter(moment(str))) {
      // 当前时间晚于传入时间
      time = moment(str).format('MM月DD日 HH:mm')
    } else if (
      currentWeek === actWeek &&
      moment().add(8, 'd').isAfter(moment(str))
    ) {
      // 本周
      const cur = moment(str).format('E')
      time = '本' + getWeek(cur)
    } else if (
      actWeek - currentWeek === 1 ||
      moment().add(tet, 'd').isAfter(moment(str))
    ) {
      // 下周
      const next = moment(str).format('E')
      time = '下' + getWeek(next)
    } else {
      // 超过两周
      time = moment(str).format('MM月DD日 HH:mm')
    }
  } else {
    time = ''
  }
  return time
}

// 登陆
export const login = () => {
  location.href = isApp() ? '/login?cmd=login' : `//passport.cekid.com/passport/login?referer=${encodeURIComponent(location.href)}`
}

// 确认登陆
export const ensureLogin = () => {
  return new Promise((resolve, reject) => {
    const uid = Cookies.get('uid')
    const skey = Cookies.get('skey')
    const phone = Cookies.get('phone')
    if (uid && skey) {
      return resolve({
        uid,
        skey,
        phone
      })
    }
    reject(new Error('未登录'))
    login()
  })
}

// 生成二维码
export const qrCode = (el:any, config:any) => {
  const QRCode = require('./qrCode')
  const {text, width=150, height=150, colorDark='#000000', colorLight='#ffffff'} = config
  new QRCode(el, {
    text,
    width,
    height,
    colorDark,
    colorLight,
    correctLevel: QRCode.CorrectLevel.H
  })
}

// // 获取分享key
export const getKey = async (param:any) => {
  return ''
}

// 关闭正在播放的视频
export const closeVideo = (index = -1) => {
  const videos = document.getElementsByTagName('video')
  for (let i = videos.length - 1; i >= 0; i--) {
    if(index !== -1) {
      if(index !== i) {
        videos[i].pause()
      }
    } else {
      videos[i].pause()
    }
  }
}

// 过滤空格html
export function filterHtml(str: string) {
  if (str) {
    return str.replace(/\s+/g, '').replace(/(<([^>]+)>)/ig, '')
  }
  return str
}

// 获取字符串字节长度
export function getLength(val:string) {  
  const str = new String(val) 
  let bytesCount = 0  
  for (let i = 0 ,n = str.length; i < n; i++) {  
    const c = str.charCodeAt(i) 
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
      bytesCount += 1 
    } else {  
      bytesCount += 2 
    }  
  }  
  return bytesCount
} 

/**
 * 截取字符串 中英文混合
 * @param str	待处理字符串
 * @param len	截取字节长度 中文2字节 英文1字节
 */
export function subString1(str:string, len:number){
  const regexp = /[^\x00-\xff]/g// 正在表达式匹配中文
  // 当字符串字节长度小于指定的字节长度时
  if (str.replace(regexp, 'aa').length <= len) {
    return str
  }
  // 假设指定长度内都是中文
  const m = Math.floor(len/2)
  for (let i = m, j = str.length; i < j; i++) {
    // 当截取字符串字节长度满足指定的字节长度
    if (str.substring(0, i).replace(regexp, 'aa').length >= len) {
      return str.substring(0, i)
    }
  }
  return str
}
