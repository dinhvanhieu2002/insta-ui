import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as ROUTE from './constants/routes'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTE.LOGIN} element={<Login />} />
          <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
