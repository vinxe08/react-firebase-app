import { DotWave } from '@uiball/loaders'
import { doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config'
import { useParams } from 'react-router-dom'
import { Posts } from '../../type'
import Avatar from '../Avatar'
import CommentField from '../CommentField'
import CommentList from './CommentList'

function Post() {
  const [post, setPost] = useState<Posts>()
  const { id } = useParams()

  // Fetching a single post according to Params.
  useEffect(() => {
    if(!id) return // do nothing || end 

    // Otherwise do this
    try {
      const postCollectionRef = doc(db, "posts", id)
      const fetchDoc =  async() => {
        const doc = await getDoc(postCollectionRef) // fetch all data
        const result = doc.data()

        setPost(result as Posts)
      }
      fetchDoc()
    } catch (error) {
      console.log(error)
    }
  }, [id])

  if(!post){
    return (
      <div className='flex justify-center items-center w-screen h-screen p-10 rounded-lg'>
        <DotWave size={100} color="black"/>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen h-full flex items-center justify-center bg-gray-200 py-6'>
      <div className='flex flex-col relative bg-white rounded-md w-[75vw] max-w-[600px] py-6'>
        {/* FOR AVATAR */}
        <div className='absolute -top-5 -left-10'>
          <Avatar seed={post?.name} size="xl"/>
        </div>
        <h1 className='text-3xl font-bold px-16 text-violet-600'>{post.name} <span className='text-gray-700'>•</span> 🛫</h1>
        <h1 className='text-4xl font-semibold px-8 py-12 self-center text-gray-800'>{post.post}</h1>
        <div className='border-t border-t-blue-400 pt-4'>
          {id && <CommentField id={id}/>}
        </div>
        <div className='flex flex-col'>
          <CommentList postOwner={post.name}/>
        </div>
      </div>
    </div>
  )
}

export default Post