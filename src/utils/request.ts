import * as Sentry from '@sentry/browser'
import { Toast } from 'antd-mobile'
import Cookies from 'js-cookie'

interface RequestParams {
  codeField?: string;
  msgField?: string;
  isSuccess?: (body: any) => boolean;
  shouldLogin?: (body: any) => boolean;
  hideNotify?: boolean;
  ignoreLogin?: boolean;
}

export default async function request(url: string, options: RequestInit = {}, params: RequestParams = {}): Promise<any> {
  const {
    codeField = 'code',
    msgField = 'msg',
    isSuccess,
    shouldLogin,
    hideNotify = false,
    ignoreLogin = false,
  } = params

  const defaultOptions: RequestInit = { credentials: 'include', cache: 'no-cache' }
  options = { ...defaultOptions, ...options }

  if ((['POST', 'PUT', 'DELETE'] as any[]).includes(options.method)) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      ...options.headers,
    }
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
  }

  // const authorization = localStorage.getItem('token-fuwu') || ''
  // if (authorization) {
  //   options.headers = Object.assign(options.headers || {}, { Authorization: authorization })
  // }

  let responseBody = ''
  let traceID = ''
  try {
    const response: Response = await window.fetch(url, options)
    traceID = response.headers.get('x-trace-id') || ''    // add_header 'Access-Control-Expose-Headers' 'x-trace-id';
    responseBody = await response.clone().text()
    const json = await response.json()
    // code为0
    if ((url.indexOf('DoLikeCommentForService') > 0) || (url.indexOf('GetCommentDetailForService') > 0)) {
      return json
    }
    if (typeof isSuccess === 'function' ? isSuccess(json) : (+json.code === 1 || +json.code === 1001 || +json.errno === 0)) {
      return json
    } else if (typeof shouldLogin === 'function' ? shouldLogin(json) : (+json.code === 1005 || +json.code === 500011 || +json.errno === 1024 || +json.code === 1024)) {
      // if(!ignoreLogin) {
      //   Toast.fail('未登录')
      // }
      throw 'login'
    } else {
      throw json
    }
  } catch (e:any) {
    if (e === 'login') {
      throw e
    }
    if (!(e instanceof Error) && e[msgField] && typeof e[codeField] !== undefined) {
      if(hideNotify !== true){
        Toast.fail(e[msgField])
      }
      // 系统异常或调用外部接口异常
      // errorCode 不规范，此情况暂不上报
      // if (process.env.REACT_APP_ENV === 'production' && traceID && (e[codeField] < 0 || e[codeField] > 9000)) {
      //   Sentry.withScope(scope => {
      //     scope.setExtras({
      //       url,
      //       options,
      //       responseBody,
      //       trace_id: traceID,
      //       desc: '系统异常或调用外部接口异常'
      //     })
      //     Sentry.captureException(e)
      //   })
      // }
    } else {
      if(hideNotify !== true){
        Toast.offline('网络错误')
      }
      if (process.env.REACT_APP_ENV === 'production') {
        Sentry.withScope(scope => {
          scope.setExtras({
            url,
            options,
            responseBody,
            desc: '网络错误'
          })
          Sentry.captureException(e)
        })
      }
    }
   
    throw e
  }
}
