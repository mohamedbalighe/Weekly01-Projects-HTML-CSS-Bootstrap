import { Pencil, SquarePlus, TrashBin,Rocket } from "@gravity-ui/icons";
import { Button, Dropdown, Kbd, Label,Modal, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function DropDownMenu({PostId}) {
      const [isOpen , setisOpen]=useState(false)
  let query= useQueryClient()
  let navigate =useNavigate()

    // delete Post
function deletePost() {
  return axios.delete(`https://route-posts.routemisr.com/posts/${PostId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

const { mutate: handleDeletePost, data: delData , isPending  } = useMutation({
  mutationFn: deletePost,
  onSuccess:()=>{
    toast.success('Post Deleted Succesfully')
    query.invalidateQueries({queryKey:['getPosts']})
    query.invalidateQueries({queryKey:['getProfilePost']})
    navigate('/home')

  },
  onError:()=>{
    toast.error('Faild to delete post')
  },
})

//update post 
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
console.log(delData);

function updatePost(){
  return axios.put(`https://route-posts.routemisr.com/posts/${PostId}` , prapareData() , {
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
}

const { data, mutate: handleUpdatePost, isPending: isUpdating } = useMutation({
  mutationFn: updatePost,

  onSuccess: () => {
    toast.success("Post updated successfully");
     if (body.current) {
      body.current.value = "";
    }
    if (image.current) {
      image.current.value = "";
    }

    setuploadimage(null);
    query.invalidateQueries({
      queryKey: ["getPosts"],
    });

    query.invalidateQueries({ queryKey: ["getPosts"] });
    query.invalidateQueries({ queryKey: ["getProfilePost"] });

    setisOpen(false);
  },

  onError: () => {
    toast.error("Failed to update post");
  },
});

console.log(data);
  return <>
    <Dropdown>
      <Button 
        isIconOnly 
        aria-label="Menu" 
        variant="light" 
        className="rounded-full bg-transparent hover:bg-gray-200 transition-colors"
      >
        <Ellipsis className="w-5 h-5 text-gray-600" />
      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) =>{
           console.log(`Selected: ${key}`)
           if(key === 'edit-post'){
            setisOpen(true)
           }
           }}>
          
          <Dropdown.Item onClick={()=>{handleUpdatePost}} id="edit-post" textValue="Edit post">
            <div className="flex items-center gap-2 w-full">
              <Pencil className="size-4 shrink-0 text-gray-600" />
                          <Label>Edit Post</Label>

              
             
            </div>

            
          </Dropdown.Item>

          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <div className="flex items-center gap-2 w-full">
              <TrashBin className="size-4 shrink-0 text-danger" />
              <Label className="cursor-pointer text-danger">Delete file</Label>
              
            </div>
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown.Popover>
      
    </Dropdown>
<Modal isOpen={isOpen} onOpenChange={setisOpen}>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog className="sm:max-w-[500px]">

        <Modal.CloseTrigger />

        <Modal.Header>
          <Modal.Heading>update your Post</Modal.Heading>
        </Modal.Header>

        <Modal.Body>
          <TextArea
            placeholder="What's on your mind?"
            className="w-96 h-32"
            ref={body}
          />
        </Modal.Body>

        <label htmlFor={PostId}>
          <input
            ref={image}
            onChange={imagePreview}
            type="file"
            id={PostId}
            hidden
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
            />
          </svg>
        </label>

        {uploadimage && (
          <div className="relative">
            <img src={uploadimage} alt="" />

            <svg
              onClick={closeImage}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute top-0 right-0 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}

        <Modal.Footer>
          <Button variant="secondary" slot="close">
            Cancel
          </Button>

          <Button
            color="primary"
            isDisabled={isPending}
            onClick={handleUpdatePost}
          >
            {isPending ? (
              "updating"
            ) : (
              "update "
            )}
          </Button>
        </Modal.Footer>

      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>
    
  </>
}