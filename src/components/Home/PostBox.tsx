import { DotWave } from '@uiball/loaders'
import { collection, onSnapshot } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase-config'
import { Posts } from '../../type'
import CommentField from '../CommentField'
import Post from './Post'

function PostBox() {
    const [posts, setPosts] = useState<Posts[]>()

    useEffect(() => {
      const postCollectionRef = collection(db, "posts") // Reference

      // For realtime-data fetching
      const unsubscribe = onSnapshot(postCollectionRef, (data) => {
        const result = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setPosts(result as Posts[])
      })

      // For clean-up
      return () => {
        unsubscribe();
      }
    }, [])

  return (
    <div className='flex flex-col w-full md:max-w-[750px] space-y-8 '>
      {!posts && 
      <div className='flex justify-center w-full h-screen p-10 rounded-lg'>
        <DotWave size={100} color="white"/>
      </div> }
      
      {posts?.map(post => (
        <div key={post?.id}>
          <Link to={`/post/${post.id}`} >
            <div className='flex flex-col bg-white p-5 md:rounded-xl space-y-4 hover:cursor-pointer transition hover:scale-105'>
              <Post post={post}/>
              <CommentField id={post?.id}/>
          </div>
        </Link>
      </div>
      ))}
    </div>
  )
}

export default PostBox