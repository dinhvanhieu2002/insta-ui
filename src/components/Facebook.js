import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'

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
      />
    )
  }

  return <div>{fbContent}</div>
}
