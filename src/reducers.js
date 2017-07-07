export default function(state = {}, action) {
    if (action.type == 'RECEIVE_USERS') {
        state = {
            ...state,
            users: action.users
        };
    }
    return state;
}
