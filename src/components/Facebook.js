import { useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
export default function Facebook() {
  const [facebookUser, setFacebookUser] = useState({
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    avatar: '',
  })

  const componentClicked = () => {
    console.log('clicked')
  }

  const responseFacebook = (response) => {
    console.log(response)
    setFacebookUser({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      avatar: response.picture.data.url,
    })
  }

  let fbContent

  if (facebookUser.isLoggedIn) {
    fbContent = (
      <div>
        <img src={facebookUser.avatar} alt={facebookUser.name} />
        <h2>Welcome {facebookUser.name}</h2>
        Email: {facebookUser.email}
      </div>
    )
  } else {
    fbContent = (
      <FacebookLogin
        appId="1109592853253655"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className={clsx('btn text-sm w-full gap-x-2 h-auth-btn-h', 'text-white bg-primary')}
          >
            <FontAwesomeIcon icon={faFacebookSquare} className="text-white" size="lg" />
            <span>Log in with Facebook</span>
          </button>
        )}
      />
    )
  }

  return <div>{fbContent}</div>
}
