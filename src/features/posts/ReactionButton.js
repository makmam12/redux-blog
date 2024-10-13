import { useDispatch } from "react-redux";
import { rectionAdded } from "./postsSlice";
const reactonEmoje = {
    thumbsUp: 'thumb',
    wow: 'wow',
    heart: 'heart',
    rocket: 'rocket',
    coffee: 'coffee'
}

function ReactionButton({ post }) {

    const dispach = useDispatch();

    const reactionButtons = Object.entries(reactonEmoje).map(([name, emoje]) => {
        return (
            <button
                key={name}
                type="button"
                className="reaction-button"
                onClick={() => 
                    dispach(rectionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoje} {post.reactions[name]}
            </button>
        )
    })
    return (
        <div className="reaction-buttons">{reactionButtons}</div>
    )
}

export default ReactionButton