import React, { useContext, useState } from 'react';
import { UserPlus, Check, MapPin, Link2, Sparkles, MessageCircle } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import CreatePostCard from '../CreatePostCard/CreatePostCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostCard from '../../PostCard/PostCard';

export default function Profile() {
  const [isConnected, setIsConnected] = useState(false);
    let {UserData}=useContext(AuthContext)

function getProfilePosts(){
  return axios.get(`https://route-posts.routemisr.com/users/${UserData._id}/posts` , {
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
}

const {data , isLoading , error} = useQuery({
  queryKey: ['getProfilePost'] ,
  queryFn: getProfilePosts
})

console.log(data);

  const stats = [
    { label: 'Followers', value: '1.2K' },
    { label: 'Following', value: `${UserData?.followingCount}` },
    { label: 'Projects', value: '50' },
  ];

  return <>
    <div className="mx-auto w-97 md:w-200 mt-20 bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
      
      {/* Cover Image with Glassmorphic Accent */}
      <div className="relative h-36 bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
          alt="Cover"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/20" />
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Pro Member
        </span>
      </div>

      {/* Profile Details Header */}
      <div className="relative px-6 pb-6 pt-0">
        
        {/* Avatar with Glow Ring */}
        <div className="relative -mt-16 mb-4 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-28 h-28 rounded-full p-1 bg-white shadow-md">
              <img
                src={UserData?.photo}
                alt="Jane Doe"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center justify-center gap-1.5">
            {UserData?.name}
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online now" />
          </h2>
          
          <p className="text-xs font-semibold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
            Software Engineer | UI/UX Designer
          </p>

          <p className="text-xs text-slate-500 leading-relaxed px-2 pt-1">
            Passionate about creating intuitive and beautiful web experiences.
          </p>
        </div>

        {/* Location & Links */}
        <div className="flex items-center justify-center gap-4 text-slate-400 text-xs mt-3 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Cairo, Egypt
          </span>
          <span className="flex items-center gap-1 hover:text-sky-500 transition-colors cursor-pointer">
            <Link2 className="w-3.5 h-3.5" /> portfolio.dev
          </span>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 py-3 my-4 bg-slate-50/80 rounded-2xl text-center border border-slate-100/80">
          {stats.map((stat, idx) => (
            <div key={idx} className="px-1">
              <p className="text-base font-extrabold text-slate-800">{stat.value}</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${
              isConnected
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 hover:opacity-95'
            }`}
          >
            {isConnected ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Connected
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Connect
              </>
            )}
          </button>

          <button 
            aria-label="Message"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 hover:border-sky-200 transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
               {/* <CreatePostCard/> */}

      </div>
    </div>
    <div className="">
  {data?.data.data.posts.map((post)=>{ return <PostCard posts={post}/> })}
</div>
    
  </>;
}