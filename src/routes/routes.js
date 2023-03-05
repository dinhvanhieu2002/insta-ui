import Login from '../pages/login'
import SignUp from '../pages/signup'
import Dashboard from '../pages/dashboard'
import Profile from '../pages/profile'
import Chat from '../pages/chat'
import NotFound from '../pages/not-found'

export const routesGen = {
  home: '/',
}

const routes = [
  {
    index: true,
    element: <Dashboard />,
    state: 'home',
  },
  {
    path: '/login',
    element: <Login />,
    state: 'login',
  },
  {
    path: '/signup',
    element: <SignUp />,
    state: 'signup',
  },
  {
    path: '/p/:username',
    element: <Profile />,
    state: 'profile',
  },
  {
    path: '/chat',
    element: <Chat />,
    state: 'chat',
  },
  {
    path: 'notfound',
    element: <NotFound />,
    state: 'notfound',
  },
]

export default routes
