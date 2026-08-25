import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Register from '../../Auth/Register/Register'
import Login from '../../Auth/Login/Login'
import NoteFound from '../NoteFound/NoteFound'
import PostCard from '../../PostCard/PostCard'
import CreatePostCard from '../CreatePostCard/CreatePostCard'
import Profile from '../Profile/Profile'

export default function Layout() {
  return<>
  
<Navbar/>
<Outlet/>

  </>
}
