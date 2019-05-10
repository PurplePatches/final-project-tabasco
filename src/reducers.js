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
                //IMPORTANT:
                if (friend.id == action.otherId) {
                    return {
                        ...friend,
                        accepted: true
                    };
                } else {
                    return friend;
                }
            })
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter(arg => {
                return arg.id != action.otherId;
            })
        };
        return state;
    } else if (action.type == "GET_ONLINE_USERS") {
        console.log(action.online, "state in get online users reducer");
        state = {
            ...state,
            online: action.online
        };
    } else if (action.type == "USER_LEFT") {
        state = {
            ...state,
            online: state.online.filter(arg => action.userId != arg.id)
        };
        console.log("after filter", state.online);
    } else if (action.type == "USER_JOINED") {
        state = {
            ...state,
            online: state.online.concat(action.userId)
        };
    } else if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            messages: action.data
        };
    } else if (action.type == "NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            messages: state.messages.concat(action.data)
        };
    }

    return state;
}

//CONDITIONALS FOR THREE ACTIONS : for online users, array into state
//user joined : replace list of online users with a new list that contains all of the users that were in the old list plus the one new user in the action
//for userLeft, replace the list of online users with a new list that contains all of the user objects that were in the old list except the one whose id is in the action
