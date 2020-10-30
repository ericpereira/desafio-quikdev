import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'

const Routes = () => {
  return (
      <BrowserRouter>
          <Route component={Home} path='/' exact />
          <Route component={MovieDetail} path='/detail/:movie_id' exact />           
      </BrowserRouter>
  )
}

export default Routes