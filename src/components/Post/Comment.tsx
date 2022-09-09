import React from 'react'
import { Comment as CommentType } from '../../type'
import Avatar from '../Avatar'
import TimeAgo from 'react-timeago'

type Props = {
  postOwner: string
  comment: CommentType
}


const Comment:React.FC<Props> = ({postOwner, comment}) => {
  const date:Date = comment?.createdAt?.toDate()

  return (
    <div className='border-t border-t-blue-500 p-4 flex space-x-4'>
      <Avatar seed='Vince' size='small' />
      <div>
        <div className='flex space-x-2'>
          <h1 className='font-bold text-blue-500'>
            {comment.name}
          </h1>
          <span> • </span>
          <h1 className='font-semibold text-gray-400'>
            {date && <TimeAgo date={date}/>}
          </h1>
        </div>
        <div className='flex space-x-2 items-center'>
          <h1 className='text-sm text-gray-500'>
            Replying to
          </h1>
          <h1 className='text-violet-500 font-semibold'>
            @{postOwner}
          </h1>
        </div>
          <p className='pt-4 text-lg font-medium text-gray-900'>{comment.comment}</p>
        </div>
      </div>
      )
}

export default Comment