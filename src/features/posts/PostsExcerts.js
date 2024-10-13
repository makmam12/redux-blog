import PostAuthor from "./PostAuthor"
import ReactionButton from "./ReactionButton"
import { UseDispatch, useDispatch } from "react-redux"
import { showSinglePost } from "./postsSlice";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link } from "react-router-dom";


function PostsExcerts({postId}) {

  const post = useSelector(state => selectPostById(state, postId))
  console.log(post)
  const dispatch = useDispatch();

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p className="post-credit">
        <PostAuthor userId={post.userId} />
        
      </p>
      <div className="reactions">
        <ReactionButton post={post}/>
      </div>
      <div className="view-button">
        <Link to={`/post/${post.id}`} >
        <button onClick={() => dispatch(showSinglePost(post))}>view more</button>
        </Link>
      </div>
    </div>
  )
}

export default PostsExcerts