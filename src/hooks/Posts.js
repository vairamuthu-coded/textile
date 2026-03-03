import React, { useReducer, useState } from 'react'
import postReducer, { ACTION_TYPES, INITIAL_STATES } from './postReducer';

const Posts = ({str}) => {

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATES)
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({});
    const [error, setError] = useState(false)
    const handleFetch = () => {
        dispatch({ type: ACTION_TYPES.FETCH_START, })
        fetch(str).then((res) => {
            return res.json();
        })
            .then((data) => {
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data })
            }).catch((err) => {
                dispatch({ type: ACTION_TYPES.FETCH_ERROR })
            })
    }
    return (
        <div>
            <button onClick={handleFetch}>
                {state.loading ? "WAIT" : "FETCH THE POST "}
            </button>
            <p style={{ backgroundColor: "lightgrey" }}>
                {
                    JSON.stringify(state.post)
                }
            </p>
            <span>{state.error && "SomeThing went wrong"}</span>
        </div>
    )
}

export default Posts
