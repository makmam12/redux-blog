import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

function PostAuthor({userId}) {
    const users = useSelector(selectAllUsers)

    const author = users.find(user => user.id === userId)


  return <span>By {author? author.name: 'Unknown authr'}</span>
}

export default PostAuthor; 