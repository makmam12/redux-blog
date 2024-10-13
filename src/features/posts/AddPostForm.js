import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { Navigate } from 'react-router-dom'

function AddPostForm() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState(null)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

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

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const SaveAdd = () => {
        if (canSave) {
            try{
                dispatch(addNewPost({title, content, userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                Navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        } 
    }


    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    console.log(usersOptions)

    return (
        <section className='add-post section-margin'>
            <h1>Add a New Post</h1>
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
                <button type='button' onClick={SaveAdd} disabled={!canSave}>Save Post</button>
                </div>
            </form>
        </section>
    )
}

export default AddPostForm  