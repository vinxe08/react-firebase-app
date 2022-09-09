import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../firebase-config'
import { Comment } from '../type'
import Avatar from './Avatar'

type Props = {
  id: string
}

const CommentField:React.FC<Props> = ({id}) => {
  const [inputs, setInputs] = useState<Comment>({
    name: '',
    comment: '',
    imgUrl: ''
  })

  const commentOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const commentCollectionRef = collection(db, "comments")

   // Add Comment into firebase function
   const addComment = async (e:any) => {
    e.preventDefault();
    const notification = toast.loading("Adding new comment...") // Loading Notification

    try{
      await addDoc(commentCollectionRef, 
        { name: inputs.name,
          comment: inputs.comment,
          imgUrl: `https://avatars.dicebear.com/api/open-peeps/${inputs.name}.svg`,
          createdAt: serverTimestamp(),
          id: id,
        })
      setInputs({
        name: '',
        comment: '',
        imgUrl: '',
      })
      toast.success('Comment Added 🚀', {
        id: notification
      })
    } catch (error) {
      toast.error("Something went wrong ⚠️", {
        id: notification
      })
    }
  }

  return (
    <div 
      onClick={(e:any) => e.stopPropagation()}
      className='pb-5 px-6 space-y-4 flex flex-col'>
      <div className='flex space-x-2 border border-gray-200 p-3 rounded-md'>
        <Avatar seed={inputs.name} size=''/>
        <input 
          onClick={(e:any) => e.preventDefault()}
          className='flex-grow outline-none text-blue-700 font-bold p-2'
          type="text" 
          placeholder='Enter your name' 
          name="name"
          value={inputs.name}
          onChange={commentOnChange}
          />
      </div>
      <textarea 
        onClick={(e:any) => e.preventDefault()}
        className='flex-grow outline-none text-gray-700 font-semibold p-2 pl-4 border border-gray-100'
        placeholder='Add Comment 🔥' 
        name="comment"
        value={inputs.comment}
        onChange={commentOnChange}
      />
      <button 
        disabled={!inputs.name || !inputs.comment}
        onClick={addComment}
        className='bg-blue-400 w-[180px] self-center p-2 rounded-md text-white text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        Submit
      </button>
    </div>
  )
}

export default CommentField