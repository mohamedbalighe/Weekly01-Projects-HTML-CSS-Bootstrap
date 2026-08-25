import React from 'react'
import Register from './../../Auth/Register/Register';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from '@heroui/react';
import toast from 'react-hot-toast';
 

export default function CommentCard({ comment, PostId }) {
  const query = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: '',
      image: ''
    }
  });

  function createComment(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${PostId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }

  const { data, isPending, isError, error, mutate } = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      reset();

      query.invalidateQueries({
        queryKey: ['getPosts']
      });

      query.invalidateQueries({
        queryKey: ['getPostComments', PostId]
      });

      toast.success('Comment Created Successfully', {
        position: 'top-right'
      });
    },

    onError: (error) => {
      console.log(error.response?.data);

      toast.error(
        'Something went wrong',{
          position: 'top-right'
        }
      );
    }
  });

  function handleCreateComment(data) {

    const formData = new FormData();

    console.log('createComment:', data);
    console.log('image:', data.image?.[0]);

    if (!data.content && !data.image?.[0]) {
      return;
    }

    if (data.content) {
      formData.append('content', data.content);
    }

    if (data.image?.[0]) {
      formData.append('image', data.image[0]);
    }

    mutate(formData);
    console.log(formData);
    
  }



  return <>
  <div className="bg-white  rounded-b-2xl mx-auto  p-4 border-t border-gray-100 space-y-3">
  
  {/* Add Comment Input */}
 <form onSubmit={handleSubmit(handleCreateComment)} className="flex items-center space-x-2 rtl:space-x-reverse">
  <img
    src={comment?.commentCreator?.photo}
    alt="User"
    className="w-8 h-8 rounded-full object-cover"
  />
  <div className="flex-1 relative">
    <input
    {...register('content')}
      type="text"
      placeholder="Write a comment..."
      className="w-full bg-gray-200 hover:bg-gray-200 focus:bg-white text-sm text-gray-800 rounded-2xl px-4 py-2 pr-20 rtl:pr-4 rtl:pl-20 outline-none border border-transparent focus:border-gray-300 transition-all placeholder:text-gray-500"
    />
    
    <div className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 flex items-center space-x-2 rtl:space-x-reverse">
       <label htmlFor="comment-image" className="cursor-pointer text-blue-600  transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input multiple {...register('image')} type="file" id="comment-image" className="hidden" accept="image/*" />
      </label>

       <button
        type="submit" 
        className="text-blue-600 font-semibold text-xs hover:underline">Post
      </button>
    </div>
  </div>
</form>

  {/* Comments List */}
  <div className="space-y-3 pt-2">
    
    {/* Single Comment Item */}
    <div className="flex items-start space-x-2 rtl:space-x-reverse group">
      <img
        src={comment?.commentCreator.photo}
        alt="Comment Author"
        className="w-8 h-8 rounded-full object-cover mt-1"
      />

      <div className="flex-1">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Comment Bubble */}
          <div className="bg-gray-200/80 rounded-2xl px-3 py-2 inline-block max-w-[85%]">
            <h4 className="font-semibold text-xs text-gray-900 hover:underline cursor-pointer">
             {comment?.commentCreator.name}
            </h4>
            <p className="text-sm text-gray-800 leading-snug wrap-break-words">
             {comment?.content}
            </p>
          </div>

          {/* Options Button */}
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-opacity">
            •••
          </button>
        </div>

        {/* Comment Actions (Like / Reply / Time) */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-gray-500 mt-1 mr-3 rtl:ml-3 font-semibold">
          <button className="hover:underline hover:text-blue-600">Like</button>
          <button className="hover:underline hover:text-blue-600">Reply</button>
          <span className="font-normal text-[10px] text-gray-400">{comment?.createdAt}</span>
        </div>
      </div>
    </div>

  </div>

</div>
  </>
}
