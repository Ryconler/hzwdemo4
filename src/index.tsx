import React from 'react'
import ReactDOM from 'react-dom'
import VConsole from 'vconsole'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { getUrlAllParams } from '@/utils/utility'
import './assets/styles/main.scss'
// import wechatShare from './utils/wechatShare'

// window.wechatShare = wechatShare
// wechatShare.ready()
const { debug } = getUrlAllParams(location.href) || {}
if (debug === '1') {
  new VConsole()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
