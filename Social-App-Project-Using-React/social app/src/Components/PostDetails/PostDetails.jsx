import { Spinner } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import PostCard from '../../PostCard/PostCard'
import { useParams } from 'react-router-dom'

export default function PostDetails() {

    let {id}=useParams()

    function getPostDetails(){
         return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
      }   
    })
  }

const {data, isLoading, isError, error} = useQuery({
  queryKey: ['getSinglePost', id],
  queryFn: getPostDetails
});
    if(isLoading){
        return <div className='flex justify-center items-center h-screen  text-sm'>
            <Spinner/></div> 
        }

    if(isError){
    return <div  className='flex justify-center items-center h-screen text-red-600 font-bold text-sm'>
     <h2>{error.message}</h2>
    </div>
  }

    return <>
        <PostCard isSinglePost={true} posts={data?.data.data.post} />
    </>

}
