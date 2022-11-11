import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function ProtectedRoute({ user, children, ...rest }) {
  console.log(user)
  // return <Route {...rest} element={() => (user ? children : <Navigate to={ROUTES.LOGIN} replace={true} />)} />
  return user ? children : <Navigate to={ROUTES.LOGIN} replace={true} />
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
}
