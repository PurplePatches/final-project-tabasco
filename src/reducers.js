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
        state = {
            ...state,
            users: state.users.map(friend => {
                if (friend.id == action.otherId) {
                    friend.accepted = true;
                }
                return friend;
            })
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter(arg => {
                return arg.id != action.otherId;
            })
        };
    }

    return state;
}

//CONDITIONALS FOR THREE ACTIONS : for online users, array into state
//user joined : replace list of online users with a new list that contains all of the users that were in the old list plus the one new user in the action
//for userLeft, replace the list of online users with a new list that contains all of the user objects that were in the old list except the one whose id is in the action
