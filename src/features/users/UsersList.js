import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";


function UsersList() {

    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <div>user.name</div>
        </li>
    ))
  return (
    <section>
        <h2>Users: </h2>
        <ul>
            {renderedUsers}
        </ul>
    </section>
  )
}

export default UsersList