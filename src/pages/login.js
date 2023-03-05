import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import userApi from '../api/modules/user'
import { setUser } from '../redux/features/userSlice'

import Facebook from '../components/Facebook'

import * as ROUTES from '../constants/routes'
import LoginScreenShot from '../components/LoginScreenShot'
import FormDivider from '../components/Form/FormDivider'
import Meta from '../layouts/Meta'
import { logo } from '../assets/images'

export default function Login() {
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const dispatch = useDispatch()

  const signinForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, 'username minimun 8 characters').required('username is required'),
      password: Yup.string().min(8, 'password minimum 8 characters').required('password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, error } = await userApi.signin(values)
      setIsLoginRequest(false)

      if (response) {
        signinForm.resetForm()
        dispatch(setUser(response))
        toast.success('Sign in success')
        console.log('login success')
      }

      if (error) {
        setErrorMessage(error.message)
        console.log('login faild')
      }
    },
  })

  return (
    <Meta title="Login - Instagram">
      <div className={clsx('flex justify-center lg:w-container-w mx-auto')}>
        <LoginScreenShot />
        <div className={clsx('w-form-w py-9')}>
          <div className={clsx('wrapper-border px-10 py-12')}>
            <img className={clsx('mx-auto')} src={logo} alt="Logo" />
            <form className={clsx('flex flex-col gap-y-3 mt-10')} onSubmit={signinForm.handleSubmit}>
              <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
                <input
                  className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={signinForm.values.username}
                  onChange={signinForm.handleChange}
                  color="success"
                />
                {signinForm.touched.username && signinForm.errors.username && (
                  <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signinForm.errors.username}</span>
                )}
              </div>
              <div className={clsx('border-1 border-line rounded-sm', 'bg-body')}>
                <input
                  className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signinForm.values.password}
                  onChange={signinForm.handleChange}
                  color="success"
                />
                {signinForm.touched.password && signinForm.errors.password && (
                  <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{signinForm.errors.password}</span>
                )}
              </div>
              <button className={clsx('btn text-sm w-full gap-x-2 h-auth-btn-h mt-2', 'text-white bg-primary')}>
                Log in
              </button>
            </form>

            <FormDivider className="my-3" />

            {/* button facebook */}

            <a href="#!" className={clsx('block text-sm w-full text-center mt-7', 'text-primary')}>
              Forgot password?
            </a>
          </div>
          <div className={clsx('wrapper-border flex-center text-sm py-6 mt-3')}>
            Don&apos;t have an account?
            <a href="#!" className={clsx('ml-1', 'text-primary')}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </Meta>
  )
}
