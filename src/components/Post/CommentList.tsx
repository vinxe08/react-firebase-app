import { DotWave } from '@uiball/loaders'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase-config'
import { Comment as CommentType } from '../../type'
import Comment from './Comment'

type Props = {
  postOwner: string
}

const CommentList:React.FC<Props> = ({postOwner}) => {
  const [comments, setComments] = useState<CommentType[]>()
  const { id } = useParams()
  
  useEffect(() => {
    const commentCollectionRef = collection(db, "comments")
    const commentQuery = query(commentCollectionRef, where("id", "==", id))

    const unsubscribe = onSnapshot(commentQuery, (data) => {
      const result = data.docs.map((doc) => ({...doc.data()}))
      setComments(result as CommentType[])
    })

    return () => {
      unsubscribe()
    }
  },[id])

  if(!comments) {
    return (
      <DotWave size={100} color="black"/>
    )
  }

  return (
    <>
      {comments.map(comment => (
        <Comment key={comment.id} postOwner={postOwner} comment={comment} />
      ))}
    </>
  )
}

export default CommentList