import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import * as ROUTE from './constants/routes'

import UserContext from './context/user'
import useAuthListener from './hooks/useAuthListener'

import ProtectedRoute from './helpers/protected-route'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
  const { user } = useAuthListener()

  console.log(user)

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTE.LOGIN} element={user ? <Navigate to={ROUTE.DASHBOARD} /> : <Login />} />
            <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTE.PROFILE} element={<Profile />} />
            <Route path={ROUTE.DASHBOARD} element={user ? <Dashboard /> : <Navigate to={ROUTE.LOGIN} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
