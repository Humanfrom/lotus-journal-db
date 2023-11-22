const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const defaultState = {
    currentStudent: {},
    students: [],
}

export default function userReducer(state = defaultState, action){
    switch (action.type) {
        case CLEAR_USER:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        default: 
            return state
    }
}

export const setUser = user => ({
    type: SET_USER,
    payload: user
})

export const clearUser = user => ({
    type: CLEAR_USER
})