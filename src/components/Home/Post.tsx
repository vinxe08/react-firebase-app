import React, { useEffect, useState } from 'react'
import { Posts } from '../../type'
import TimeAgo from 'react-timeago'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase-config'

type Props = {
  post: Posts
}

const Post:React.FC<Props> = ({post}) => {
  const date:Date = post?.createdAt?.toDate()
  const [commentsLenght, setCommentsLenght] = useState<number>(0)

  useEffect(() => {
    const commentCollectionRef = collection(db, "comments") // Reference
    const commentQuery = query(commentCollectionRef, where("id", "==", post.id)) // Adding query for logic/condition for fetching

    // For realtime-data fetching
    const unsubscribe = onSnapshot(commentQuery, (data) => {
      const result = data.docs.map((doc) => ({...doc.data()}))
      setCommentsLenght(result?.length)
    })

    // clean-up function
    return () => {
      unsubscribe(); 
    }
  },[])

  return (
    <>
      <div className='flex items-center space-x-4 text-2xl font-bold relative'>
        <div className='flex flex-col items-center self-start'>
          <div className='h-16 w-16 overflow-hidden rounded-full bg-blue-100 self-start '>
            <img src={post.imgUrl} alt="Avatar" />
          </div>
          <div className='w-1 h-[10vh] bg-gray-500 rounded-full'></div>
        </div>
        <div className='flex flex-col pt-4 space-y-6 flex-grow'>
          <div className='flex space-x-2'>
            <h1 className='text-[#af3af3]'>{post.name}</h1>
            <h1 className='text-yellow-400'>•</h1>
            {date && <TimeAgo date={date}/>}
          </div>
          <p className='text-gray-600 font-semibold text-4xl py-6'>{post.post}</p>
        </div>
      </div>
      <div 
        className='flex flex-col border-t border-t-gray-400 p-4 space-y-4'>
          <div className='flex relative'>
            <h1 className='font-bold pr-2'>Comments </h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <h1 className='absolute -top-2 left-[110px] font-bold bg-blue-700 px-[4px] rounded-full text-white'>{commentsLenght}</h1>
          </div>
      </div>
    </>
  )
}

export default Post