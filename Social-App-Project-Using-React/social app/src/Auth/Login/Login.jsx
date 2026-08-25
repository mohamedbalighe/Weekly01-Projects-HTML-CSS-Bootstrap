import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../../Context/AuthContext';

export default function login() {
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setuserToken } = useContext(AuthContext);
  const [isloading, setisloading]=useState(false)

  let { register, handleSubmit, setError, formState, watch ,submitForm } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  function SubmitForm(UserData) {
    setApiError(null);
    setisloading(true)

    axios.post('https://route-posts.routemisr.com/users/signin', UserData)
      .then((response) => {console.log(response.data);

         if(response.data.message ==='signed in successfully'){
    // navigate login token home 
    setuserToken(response.data.data.token)
    localStorage.setItem('token' , response.data.data.token)

    navigate('/home')
  }}).catch((error) => {
        console.log(error.response);
        setApiError(error.response?.data?.message);
      }).finally(()=>{setisloading(false)})
  }

  


  return (
    <main className="relative min-h-screen w-full bg-white flex items-center justify-center p-4 ">
      <div className="w-full max-w-sm space-y-4 text-center my-6 rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <header className="mb-5 text-2xl font-bold bg-linear-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent ">
          Sign in Now
        </header>
        
        
        {/* Form */}
        <form onSubmit={handleSubmit(SubmitForm)} className="space-y-4 text-left">

          {/* Email */}
          <div>
            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 transition-all">
              <input
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid Email',
                  },
                })}
                type="email"
                placeholder="Email"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none text-gray-700 text-sm"
              />
            </div>
            {formState.errors.email && formState.touchedFields.email && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {formState.errors.email?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 transition-all">
              <input
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                    message: 'Invalid Password format',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none text-gray-700 text-sm"

                // <a href='#' className='text-xs font-bold text-gray-400 hover:text-blue-500 shrink-0 ml-2'> FORGOT </a>
              />
              {/* <form onSubmit={handleSubmit(submitForm)}>

  <input
    {...register('currentPassword')}
    type="password"
    placeholder="Current password"
  />

  <input
    {...register('newPassword')}
    type="password"
    placeholder="New password"
  />

  <button type="submit">
    Change Password
  </button>

</form> */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2 shrink-0"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.122-.363c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>

            
            {formState.errors.password && formState.touchedFields.password && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {formState.errors.password?.message}
              </p>
            )}
          </div>

          {/* API Error Message */}
          {ApiError && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-2xl">
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 01-2 0V9zm1-4a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
              <span>{ApiError}</span>
            </div>
          )}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full  rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-0.5] active:border-b-blue-400 transition-all"
          >
            CREATE ACCOUNT
          </button> */}

<button className="w-full  py-3 border-b-4 border-b-blue-600 font-bold text-white rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-90 transition-all">
  {isloading ? 'Loading...' : 'Log in'}
</button>


        </form>

        {/* Divider */}
        <div className="flex items-center space-x-4 my-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400 text-sm">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-100 active:translate-y-0.5 active:border-b-gray-200 text-xs"
          >
            FACEBOOK
          </button>
          <button
            type="button"
            className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-100  active:translate-y-0.5 active:border-b-gray-200 text-xs"
          >
            GOOGLE
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-blue-500 hover:underline ml-1">
            Create your account Now
          </Link>
        </div>

      </div>
    </main>
  );
}