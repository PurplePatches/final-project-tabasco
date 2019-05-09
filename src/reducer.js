export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = Object.assign({}, state, {
            solicitationpending: action.solicitationpending
        });
    }
    if (action.type == "UNFRIEND") {
        state = Object.assign({}, state, {
            accepted: false
        });
    }
    if (action.type == "USERSMENU") {
        state = Object.assign({}, state, {
            users: action.users
        });
    }
    return state;
}
