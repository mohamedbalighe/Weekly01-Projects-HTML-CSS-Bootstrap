import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import Profile  from './Components/Profile/Profile'
import Home from './Components/Home/Home'
import NoteFound  from './Components/NoteFound/NoteFound'
import { CounterContext } from './Context/CounterContext'
import { AuthContext } from './Context/AuthContext'
import AuthContextProvider from './Context/AuthContext'
import CounterContextProvider from './Context/CounterContext'
import ProtectRoute from './ProtectRoute/ProtectRoute'
import ProtectAuth from './ProtectAuth/ProtectAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './Components/PostDetails/PostDetails'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function App() {
let route= createBrowserRouter([
  {path:'', element: <Layout/>, children :[
    {path:'login', element: <ProtectAuth><Login/> </ProtectAuth>  },
    {path:'register', element:<ProtectAuth> <Register/></ProtectAuth> },
    {path:'profile', element:<ProtectRoute> <Profile/> </ProtectRoute> },
    {index:true, element:<ProtectRoute> <Home/> </ProtectRoute>},
        {path:'home', element:<ProtectRoute> <Home/> </ProtectRoute>},

    {path:'postdetails/:id', element:<ProtectRoute> <PostDetails/> </ProtectRoute>},

    {path:'*', element:<NoteFound/> },
  ]},
])

  return <>
  <QueryClientProvider client={queryClient}>
  <AuthContextProvider>

  <CounterContextProvider>
  <RouterProvider router ={route} />
  <Toaster/>
  <ReactQueryDevtools/>
  </CounterContextProvider>

</AuthContextProvider>
</QueryClientProvider>
</>
}
