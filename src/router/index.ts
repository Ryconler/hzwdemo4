import React from 'react'

const Heimlich = React.lazy(() => import('../containers/Heimlich'))

const routes = [
  {
    path: '/heimlich',
    component: Heimlich,
  }
]

export default routes
