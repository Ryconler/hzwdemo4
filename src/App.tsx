import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
// import { ActivityIndicator } from 'antd-mobile'

import Loading from './components/Loading'
import stores from './store'
import Layout from './Layout'

@observer
class App extends Component{
  render() {
    return (
      <Provider {...stores}>
        <>
          {/* <ActivityIndicator
            toast
            text="加载中..."
            animating={stores.common.animating}
          /> */}
          <Loading show={stores.common.animating}></Loading>
          <Layout />
        </>
      </Provider>
    )
  }
}

export default App
