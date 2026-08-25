import React, { useContext , useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext} from '../../Context/AuthContext'
import login from './../../Auth/Login/Login';
import Profile from './../Profile/Profile';

export default function Navbar() {
  let Navigate= useNavigate()
const [activeTab, setActiveTab] = useState('home');
const {UserToken , setuserToken}=useContext(AuthContext)


function logout(){
  localStorage.removeItem("Token")
  setuserToken(null)
  Navigate('/login')

}

  return <>
<nav className="fixed top-3 mb-24 sm:top-6 inset-x-0 z-30 mx-auto w-[95%] max-w-7xl px-2 sm:px-6 py-2 border border-gray-100 bg-white/80 shadow-sm backdrop-blur-lg rounded-full sm:rounded-3xl transition-all duration-300">
  <div className="px-1 sm:px-4">
    <div className="flex items-center justify-between gap-1 sm:gap-4">
      
      {/* 1. Logo Section */}
      <div className="flex shrink-0 items-center">
        <div aria-current="page" className="flex items-center">
          <div className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer">
            <Link to={'/home'} className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:scale-105 shrink-0">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C15.3585 20 18.2323 17.9333 19.3828 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M20 12H12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link to={'/home'} className="text-sm sm:text-2xl font-black tracking-tight text-slate-950">
              Gather<span className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">.</span>
            </Link>
          </div>
          <p className="sr-only">Website Title</p>
        </div>
      </div>

      {/* 2. Middle Section (Search Bar & Nav Links) */}
      <div className="flex items-center gap-1 sm:gap-3 flex-1 justify-center max-w-xs sm:max-w-none">
        {UserToken != null && (
          <div className="relative flex items-center w-full max-w-[120px] sm:max-w-xs">
            <svg className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-7 sm:pl-9 pr-2 py-1.5 text-xs sm:text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 rounded-full border border-transparent focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        )}

        {/* Desktop Navigation Links */}
        {UserToken != null && (
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink to={'/home'} 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'home' 
                  ? 'text-cyan-600 bg-cyan-50/80 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <svg className="w-5 h-5" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </NavLink>

            <button 
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'friends' 
                  ? 'text-cyan-600 bg-cyan-50/80 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <svg className="w-5 h-5" fill={activeTab === 'friends' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 3. Right Section (Actions & Profile) */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {UserToken != null ? (
          <>
            <button className="relative p-1.5 sm:p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500 ring-2 ring-white"></span>
            </button>

            <button className="relative p-1.5 sm:p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            <NavLink to={'/profile'} className="flex items-center p-0.5 rounded-full hover:bg-slate-100 transition-colors shrink-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border border-white"
                />
              </div>
            </NavLink>

            <NavLink 
              to="/login" 
              onClick={logout}
              className="inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 text-blue-500 hover:underline rounded-full text-[11px] sm:text-xs font-bold bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 transition-all duration-150 shrink-0"
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink

    to="/"

    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-cyan-600 hover:bg-slate-100/80 transition-colors"

  >

    <svg

      className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors"

      fill="none"

      stroke="currentColor"

      strokeWidth={2}

      viewBox="0 0 24 24"

    >

      <circle cx="12" cy="12" r="9" />

      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" />

      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />

    </svg>

    <span>Help</span>

  </NavLink>
            
            <NavLink 
              to="/login" 
              className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 text-blue-500 hover:underline rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 transition-all duration-150"
            >
              Log in
            </NavLink>
          </>
        )}
      </div>

    </div>
  </div>
</nav>

  </>
}
