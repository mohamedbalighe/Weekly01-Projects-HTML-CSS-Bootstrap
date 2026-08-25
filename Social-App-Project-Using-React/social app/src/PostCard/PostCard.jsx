import React, { useContext } from 'react'
import {  HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, EllipsisHorizontalIcon,GlobeAmericasIcon
} from '@heroicons/react/24/outline';
import CommentCard from '../Components/CommentCard/CommentCard';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './../Context/AuthContext';
import axios from 'axios';
import DropDownMenu from '../Components/DropDownMenu/DropDownMenu';


export default function PostCard({posts , isSinglePost=false}) {

  const{UserData}=useContext(AuthContext)
  let query= useQueryClient()

  function getPostComment(){
return axios.get(`https://route-posts.routemisr.com/posts/${posts.id}/comments`, {
params:{
limit:10
},
headers:{
Authorization : `Bearer ${localStorage.getItem('token')}`
}
})
}

const {data}= useQuery({
queryKey:['getPostComments',posts.id] ,
queryFn:getPostComment,
enabled:isSinglePost 
})

function likePost(){
  return axios.put(`https://route-posts.routemisr.com/posts/${posts.id}/like` , {} , {
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
}
const {data:likeData , isPending:likePending , mutate:handleLikePost}= useMutation({
  mutationFn:likePost , 
  onSuccess:()=>{

query.invalidateQueries({queryKey:['getPosts']})
query.invalidateQueries({queryKey:['getProfilePost']})
query.invalidateQueries({queryKey:['getSinglePost' , posts.id]})
  }
})
console.log(likeData);


  return <>

  <div className="w-97 md:w-200 mt-5 mx-auto  bg-white rounded-2xl  shadow-md border border-gray-200 text-gray-900 font-sans">
      {/* Header */}
     <header className="flex items-center justify-between p-4">
          <Link to={`/postdetails/${posts?.id}`} className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
            <img
              src={posts?.user?.photo}
              alt={posts?.user?.name || "user"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm hover:underline cursor-pointer">{posts?.user?.name}</h3>
              <div className="flex items-center text-xs text-gray-500 space-x-1 rtl:space-x-reverse">
                <span className='text-gray-500'>{posts?.createdAt}</span>
                <span>{posts?.user?.privacy}</span>
                <GlobeAmericasIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* القائمة المنسدلة بموقع زمني آمن فوق باقي العناصر */}
           {UserData?._id === posts.user._id &&  <div className=" hover:bg-gray-100 transition-colors text-green-500">
            <DropDownMenu PostId={posts.id}/>
          </div>}
        </header>
      

      {/* Post Text */}
      <div className="px-4 pb-3 text-sm leading-normal">
        <p>{posts?.body}</p>
      </div>

      {/* Post Image */}
      {posts?.image && <div className="w-full bg-gray-100"><img src={posts?.image}alt={posts?.image}className="w-full max-h-[450px] object-cover"
        />
      </div>}

     {/* Stats Section */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-b border-gray-200">
         <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex -space-x-1 rtl:space-x-reverse"> 
            { posts?.likesCount <=0 ? '' :<span className="bg-green-500 text-white p-1 rounded-full text-[10px] z-10">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-3 h-3"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.25M6.633 10.25H5.25m1.383 0L5.25 10.25M2.25 10.25h3v10.5h-3v-10.5z" 
                />
              </svg>
            </span>}
             {posts?.likesCount  <=1 ? '' : <span className="bg-orange-500 text-white p-1 rounded-full text-[10px] z-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3 h-3"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.549 0 3.016.66 4.062 1.838C12.8 3.66 14.266 3 15.813 3c2.974 0 5.438 2.322 5.438 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>}
          </div>
          {/* العدد الإجمالي للتفاعلات */}
          <span>{posts?.likesCount  <=0 ? "" : posts?.likesCount }</span>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button className="hover:underline">{posts?.comments?.length  <=0 ? "" :  posts?.comments} Comments </button>
          <button className="hover:underline">{posts?.sharesCount <=0 ? "" :  posts?.sharesCount} Shares</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-2 py-1 text-gray-600 text-sm font-medium">
        <button
  onClick={handleLikePost}
  disabled={likePending}
  className={`flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-2 rounded-md transition-colors ${
    likeData?.data.data.liked
     ?'text-blue-700 bg-blue-50'
      : ''
  }`}
>
  <HandThumbUpIcon className="w-5 h-5" />
  <span>{likeData?.data.data.liked? 'Liked' : 'Like'}</span>
</button>
        <button className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-2 hover:bg-gray-100 rounded-md transition-colors">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-2  hover:bg-gray-100 rounded-md transition-colors">
          <ShareIcon className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

<CommentCard PostId={posts.id} />

{!isSinglePost && posts.topComment && (
  <CommentCard
    comment={posts.topComment}
    showInput={false}
  />
)}
{/* all comments */}
{isSinglePost && data?.data.data.comments.map((comment)=>{ return <CommentCard key={comment._id} comment={comment} />})}
    </div>
  </>
  
}

