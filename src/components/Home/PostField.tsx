import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../../firebase-config'
import { Posts } from '../../type'
import Avatar from '../Avatar'

function PostField() {
  const [posts, setPosts] = useState<Posts>({
    name: "",
    post: "",
    imgUrl: "",
    id: '',
    createdAt: ''
  })

  // It will automatically creata a collection
  const postCollectionRef = collection(db, "posts")

  const postOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPosts({...posts, [e.target.name]: e.target.value})
  }

  const onSubmit = async () => {
    // Will trigger the TOASTER notification in index.tsx/Main Component
    const notification = toast.loading("Creating a new post...") // Loading Notification
    try{
      await addDoc(postCollectionRef,
        { 
          name: posts.name, 
          post: posts.post, 
          imgUrl: `https://avatars.dicebear.com/api/open-peeps/${posts.name}.svg` ,
          createdAt: serverTimestamp()
        })
      setPosts({...posts, name: "", post: ""}) // Cleaning all field

      toast.success("New post Created 🔥", {
        id: notification // Remove this loading toast
      }) // Success Notification
    }catch(error) {
      toast.error("Something went wrong!", {
        id: notification
      })
    }
  }

  return (
    <div 
      className='flex flex-col w-full md:max-w-[750px] space-y-3 bg-white  rounded-none md:rounded-xl p-5 mx-auto'>
      <div className='flex space-x-4 border border-gray-200 rounded-md p-2'>
        <Avatar seed={posts.name} size="large"/> 

        <input 
          className='outline-none p-2 flex-grow text-lg font-semibold text-blue-500 placeholder-blue-300'
          value={posts.name} 
          name="name"
          onChange={postOnChange} 
          type="text" 
          placeholder='Your Name' />
      </div>
      <textarea 
        className='border border-gray-200 rounded-md outline-none py-2 px-4 text-lg font-medium'
        value={posts.post}
        name="post"
        onChange={postOnChange}
        // type="textfield" 
        placeholder='Post'
        />
      <button 
        disabled={!posts.name || !posts.post}
        className='font-bold bg-blue-500 p-2 w-40 self-center rounded-md text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed' 
        onClick={onSubmit}>Add Post</button>
    </div>
  )
}

export default PostField