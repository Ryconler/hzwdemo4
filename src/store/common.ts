import { makeAutoObservable } from 'mobx'

class Common {
  animating: boolean = false  // 动画开关
  loading: number = 0         // 正在显示loading的接口数
  loadingTimer: any = null
  isShowPopup = false
  userInfo:any = {}
  constructor() {
    makeAutoObservable(this)
  }
  startLoading() {
    // console.log('打开loading', this.loading)
    this.loading += 1
    if (this.loadingTimer === null) {
      this.loadingTimer = setTimeout(() => {
        this.animating = true
        // Toast.loading('加载中...', 0)
      }, 200)
    }
  }
  endLoading() {
    // console.log('关闭loading', this.loading)
    if (this.loading > 0) {
      this.loading -= 1
    } else {
      this.loading = 0
    }
    if (this.loading === 0) {
      this.animating = false
      // Toast.hide()
      clearTimeout(this.loadingTimer)
      this.loadingTimer = null
    }
  }
  showPopup() {
    this.isShowPopup = true
    document.documentElement.style.position = 'fixed'
  }
  hidePopup() {
    this.isShowPopup = false
    document.documentElement.style.position = ''
  }
}

export default new Common()
