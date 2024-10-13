import { useSelector } from "react-redux"
import { selectPostById } from "./postsSlice"
import EditPost from "./EditPost"
import PostAuthor from "./PostAuthor"
import ReactionButton from "./ReactionButton"
import { Link, useParams } from "react-router-dom"

function SinglePostPage() {
  const {id } = useParams()
  const post = useSelector((state) => state.posts.singlePost)

  let content

  if (!post) {
    content =
      <section className="section-margin">
        <h2>No Post Selected</h2>
      </section>

      return content
  }


  
  content =
  <>
  <h1>{post.title}</h1>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
      <p>{post.content}</p>
      <ReactionButton post={post} />
      <Link to='/edit' >
      <button className="button">Edit Post</button>
      </Link>
  </>


  return (
    <section className="single-post">
      <div className="post" >

      {content}
      </div>
    </section>
  )

}

export default SinglePostPage