import React from 'react'
export const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const INITIAL_STATES = {
    loading: false,
    post: {},
    error: false,
}

export const postReducer = (state, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                post: {},
                
            };
        case ACTION_TYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,error: false,
                post: action.payload,
                
            };
        case ACTION_TYPES.FETCH_ERROR:
            return {
                post:{},
                loading: false,
                error: true,
            };
            default:
                return state;
    }
    // return (
    //     <>
    //     </>
    // )
}

export default postReducer
