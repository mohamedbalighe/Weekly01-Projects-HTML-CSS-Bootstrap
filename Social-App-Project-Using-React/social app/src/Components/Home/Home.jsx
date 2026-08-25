import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from '../../PostCard/PostCard'
import { ScaleLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'
import CreatePostCard from '../CreatePostCard/CreatePostCard'

export default function Home() {
  function getAllPosts(){
   return axios.get('https://route-posts.routemisr.com/posts',{
    params:{
      sort:'-createdAt'
    },
      headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
      }   
    })
  }
  
  const{data ,isLoading ,isError , error,refetch}=useQuery({
    queryKey:['getPosts'],
    queryFn: getAllPosts
  })
// console.log("POSTS:", data?.data?.data?.posts);

  if(isError){
    return <div  className='flex justify-center items-center h-screen text-red-600 font-bold text-sm'>
     <h2>{error.message}</h2>
    </div>
  }

  if(isLoading){
        return  <div className='flex justify-center items-center h-screen'> 
              <ScaleLoader color="#2563eb" height={35} width={6} radius={2} margin={2} />
            </div>
  }
  return <>
  <CreatePostCard/>
  {data?.data.data.posts?.map((posts)=>{return <PostCard isSinglePost={false} key={posts._id} posts={posts}/>})}
</>
}



