import React, { Component } from 'react'

import Style from './index.module.scss'
interface Props{
  show: boolean
}
class Loading extends Component<Props, any> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    return <div className={Style.loading} style={{display: this.props.show ? '' : 'none'}}></div>
  }
}

export default Loading
