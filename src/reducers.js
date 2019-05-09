export default function reducer(state = {}, action) {
    if (action.type == "FETCH_FRIENDS") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "ACCEPT_FRIENDSHIP") {
    }
    if (action.type == "DELETE_FRIENDSHIP") {
    }
    return state;
}
