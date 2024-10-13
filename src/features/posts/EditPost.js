import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { editPost, getPostsStatus, deletePost } from './postsSlice'
import { Navigate, useNavigate } from 'react-router-dom'


function EditPost() {
    const post = useSelector((state) => state.posts.singlePost);


  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [userId, setUserId] = useState(post.userId)
  const [postId , setPostId ] = useState(post.id)

  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch();


  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onContentChange = (e) => {
    setContent(e.target.value)
  }
  const onAuthorChanged = e => {
    setUserId(Number(e.target.value))
  }

  const canSave = [title, content, userId].every(Boolean);

  const navigate = useNavigate()

  const saveEdit = () => {
    if (canSave) {
      try {
        //Put the Post function here
        dispatch(editPost({id: postId, title: title, content: content, userId: userId, reactions: post.reactions}))
        
        setTitle('')
        setContent('')
        setUserId('')
        setPostId('')
        navigate('/')
      } catch (err) {
        console.error('Failed to save the Edit', err)
      } finally {
        
      }
    }
  }
  
  
  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  
  const deletePostfn = () => {
    try {
      dispatch(deletePost({id: postId}))
      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch{
      console.error('Failed to Delete the post')

    }
  }

  return (
    <section className='add-post section-margin'>
      <h1>Edit Post</h1>
      <form>
        <label htmlFor='postTitle'>Post Title</label>
        <input
          type='text'
          id='postTitle'
          value={title}
          name='postTitle'
          onChange={onTitleChange}
        />

        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {usersOptions}
        </select>

        <label htmlFor='postContent'>Post content</label>
        <textarea
          type='textarea'
          id='postContent'
          value={content}
          name='postContent'
          onChange={onContentChange}
        />
        <div className='buttons'>
        <button type='button' onClick={saveEdit} disabled={!canSave}>Save Edit</button>
        <button type='button' onClick={deletePostfn}>Delete Post</button>
        </div>
      </form>
    </section>
  )
}

export default EditPost