//everytime that you want to make a change in the state you have to pass trought the reducer function

function reducer(state, action) {
    if ((action.type = "CHANGE_BIO")) {
        return {
            ...state,
            otherUser: {
                ...state.otherUser,
                bio: action.bio
            }
        };
    }
    return state;
}
