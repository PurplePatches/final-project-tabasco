//REFACTOR FOR FRIENDS ROUTE
// * reducers.js
//            * conditionals for 3 action types: 'RECEIVE_FRIENDS', 'ACCEPT_FRIEND_REQUEST', 'UNFRIEND'

export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            users: action.users
        };
        console.log("state in receive friends ", state);
    } else if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return Object.assign({}, state, {
            state
        });
    } else if (action.type == "UNFRIEND") {
        return Object.assign({}, state, {
            state
        });
    }

    return state;
}
