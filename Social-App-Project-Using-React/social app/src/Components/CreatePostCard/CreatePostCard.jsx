import React, { useContext, useRef, useState } from "react";
import { Avatar, Button, Modal, TextArea } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
export default function CreatePostCard() {
    const{UserData}=useContext(AuthContext)
  
    const [isOpen , setIsOpen] = useState(false);

        let[uploadimage, setuploadimage]=useState(null)
        function imagePreview(e){
        let imgsrc=  URL.createObjectURL(e.target.files[0])
        setuploadimage(imgsrc)
      }

    function closeImage(){
     setuploadimage(null)
     image.current.value=null
    }

    let image=useRef(null)
    let body =useRef(null)

    
        let query =useQueryClient()

    function prapareData(){
        let formData= new FormData()
        if(body.current.value){
            formData.append('body', body.current.value)
        }
        if(image.current.files[0]){
                formData.append('image', image.current.files[0])
        }
        return formData
    }

    function createPost(){
        return axios.post(`https://route-posts.routemisr.com/posts`, prapareData(),{
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
      }   
    })
    }

  const { data, isPending, mutate } = useMutation({
  mutationFn: createPost,

  onSuccess: () => {
    if (body.current) {
      body.current.value = "";
    }

    if (image.current) {
      image.current.value = "";
    }

    setuploadimage(null);
        setIsOpen(false);


    toast.success("Post Created Successfully", {
      position: "top-right",
    });

    query.invalidateQueries({
      queryKey: ["getPosts"],
    });
  },

  onError: () => {
    toast.error("Something Went Wrong", {
      position: "top-right",
    });
  },
});
   console.log(data);
   

  return (
    <div className="mx-auto w-97 md:w-200 mt-25 flex md:p-5 gap-3 rounded-2xl border-2 p-1">
      <Avatar>
        <Avatar.Image
          alt="User avatar"
          src={UserData?.photo}
        />
      </Avatar>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          variant="secondary"
          className="h-auto flex-1 justify-start bg-white"
        >
          <TextArea
            readOnly
            fullWidth
            className="w-full p-2 md:p-5"
            placeholder="Show them who you are..."
          />
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[500px]">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading className="font-bold">Create Post</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <TextArea
                  placeholder="What's on your mind?"
                  className="w-96 h-32"
                  ref={body}
                />

              </Modal.Body>
              <label htmlFor="img">
                 <input ref={image} onChange={imagePreview} type="file" id="img" hidden alt=""></input>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
             </svg>
              </label>

              {uploadimage && <div className="relative">
        <img  src={uploadimage}/>

        <svg onClick={closeImage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-0 right-0">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

       </div>}

      
              <Modal.Footer >
                <Button  variant="secondary" slot="close">
                  Cancel
                </Button>

               <Button
  onClick={mutate}
  color="primary"
  isDisabled={isPending}
>
  {isPending ? (
    <svg
      className="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ) : (
    "Post"
  )}
</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}