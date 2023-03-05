// import { lazy, Suspense, useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
// import * as ROUTE from './constants/routes'

// import UserContext from './context/user'
// import useAuthListener from './hooks/useAuthListener'
// import RequiredAuth from './components/RequiredAuth'
// import ProtectedRoute from './helpers/protected-route'
import Login from './pages/login'

// const Login = lazy(() => import('./pages/login'))
// const SignUp = lazy(() => import('./pages/signup'))
// const Dashboard = lazy(() => import('./pages/dashboard'))
// const Profile = lazy(() => import('./pages/profile'))
// const Chat = lazy(() => import('./pages/chat'))
// const NotFound = lazy(() => import('./pages/not-found'))

const App = () => {
  return (
    <Login />
    // <BrowserRouter>
    //   <Routes>
    //     <Route></Route>
    //   </Routes>
    // </BrowserRouter>

    // <UserContext.Provider value={{ user }}>
    //   <Router>
    //     <Suspense fallback={<p>Loading...</p>}>
    //       <Routes>
    //         <Route path={ROUTE.DASHBOARD} exact element={user ? <Dashboard /> : <Navigate to={ROUTE.LOGIN} />} />
    //         <Route path={ROUTE.LOGIN} element={user ? <Navigate to={ROUTE.DASHBOARD} /> : <Login />} />
    //         {/* <Route path={ROUTE.LOGIN} element={<Login />} />
    //     <Route element={<RequiredAuth />}>
    //       <Route path={ROUTE.DASHBOARD} exact element={<Dashboard />} />
    //       <Route path={ROUTE.PROFILE} element={<Profile />} />
    //       <Route path={ROUTE.CHAT} element={<Chat />} />
    //     </Route> */}
    //         <Route path={ROUTE.SIGN_UP} element={user ? <Navigate to={ROUTE.DASHBOARD} /> : <SignUp />} />
    //         <Route path={ROUTE.PROFILE} element={<Profile />} />
    //         <Route path={ROUTE.CHAT} element={<Chat />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </Suspense>
    //   </Router>
    // </UserContext.Provider>
  )
}

export default App
