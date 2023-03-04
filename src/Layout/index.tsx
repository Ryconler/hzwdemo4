import React, { Component, Suspense } from 'react'
import routes from '../router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Layout extends Component {
  render():any {
    return (
      <Suspense fallback={null}>
        <Router>
          <Switch>
            {routes.map((element: any, index) => {
              return (
                <Route
                  key={index}
                  path={element.path}
                  exact={true}
                  component={element.component}
                />
              )
            })}
          </Switch>
        </Router>
      </Suspense>
    )
  }
}

export default Layout
