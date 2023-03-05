import { useState, useEffect } from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import userApi from '../api/modules/user'
import FormDivider from '../components/Form/FormDivider'
import Meta from '../layouts/Meta'
import { logo } from '../assets/images'
import ButtonFacebook from '../components/Button/ButtonFacebook'

const SignUp = () => {
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signupForm = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, 'username minimun 8 characters').required('username is required'),
      fullname: Yup.string().min(8, 'fullname minimun 8 characters').required('fullname is required'),
      email: Yup.string().min(8, 'email minimun 8 characters').required('email is required'),
      password: Yup.string().min(8, 'password minimun 8 characters').required('password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, error } = await userApi.signup(values)
      setIsLoginRequest(false)

      if (response) {
        signupForm.resetForm()
        toast.success('Sign up success')
        //redirect to login
        console.log(response)
      }

      if (error) {
        setErrorMessage(error.message)
        console.log('login faild')
      }
    },
  })

  return (
    <Meta title="Signup - Instagram">
      <div className={clsx('w-form-w mx-auto py-9')}>
        <div className={clsx('wrapper-border px-10 py-12')}>
          <img className="mx-auto" src={logo} alt="Logo" />
          <h1 className={clsx('font-medium mt-4 mb-4 text-center', 'text-gray-base')}>
            Sign up to see photos and videos from your friends.
          </h1>

          <ButtonFacebook />

          <FormDivider className="my-3" />

          <form className="flex flex-col gap-y-3" onSubmit={signupForm.handleSubmit}>
            <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
              <input
                className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                type="email"
                placeholder="Email"
                name="email"
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                color="success"
              />
              {signupForm.touched.email && signupForm.errors.email && (
                <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signupForm.errors.email}</span>
              )}
            </div>
            <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
              <input
                className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                type="text"
                placeholder="Full name"
                name="fullname"
                value={signupForm.values.fullname}
                onChange={signupForm.handleChange}
                color="success"
              />
              {signupForm.touched.fullname && signupForm.errors.fullname && (
                <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signupForm.errors.fullname}</span>
              )}
            </div>
            <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
              <input
                className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                type="text"
                placeholder="Username"
                name="username"
                value={signupForm.values.username}
                onChange={signupForm.handleChange}
                color="success"
              />
              {signupForm.touched.username && signupForm.errors.username && (
                <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signupForm.errors.username}</span>
              )}
            </div>
            <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
              <input
                className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                type="password"
                placeholder="Password"
                name="password"
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
                color="success"
              />
              {signupForm.touched.password && signupForm.errors.password && (
                <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signupForm.errors.password}</span>
              )}
            </div>
            <button className={clsx('btn text-sm h-auth-btn-h w-full gap-x-2 mt-2', 'text-white bg-primary')}>
              Sign up
            </button>
            <p className={clsx('text-xs text-center mt-2', 'text-base-gray')}>
              By signing up, you agree to our <span className="font-medium">Terms</span>,{' '}
              <span className="font-medium">Data Policy</span> and <span className="font-medium">Cookies Policy</span>.
            </p>
          </form>
        </div>
        <div className="wrapper-border flex-center text-sm py-6 mt-3">
          Have an account?
          <a href="#!" className={clsx('ml-1', 'text-primary')}>
            Log in
          </a>
        </div>
      </div>
    </Meta>
  )
}

export default SignUp
