import { useSelector, useDispatch } from "react-redux"
import { selectPostsIds, getPostError, getPostsStatus, fetchPosts } from "./postsSlice"

import { useEffect } from "react"
import PostsExcerts from "./PostsExcerts"

function PostsList() {
  const dispatch = useDispatch()



  const postsError = useSelector(getPostError)
  const postsStatus = useSelector(getPostsStatus)
  const posts = useSelector(selectPostsIds)

  
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'succeeded') {
    content = posts.map(postId => <PostsExcerts key={postId} postId={postId} />)
  } else if (postsStatus === 'failed') {
    content = <p className='error'>{postsError}</p>
  }


  return (
    <section className="posts-list section-margin">
      {content}

    </section>
  )
}

export default PostsList