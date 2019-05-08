export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id != action.id) {
                    return friend;
                } else {
                    console.log("friend in else: ", friend);
                    return {
                        ...friend,
                        status: true
                    };
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter(friend => {
                if (friend.id != action.id) {
                    return friend;
                }
            })
        };
    }

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.users
        };
    }

    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => {
                if (user.id != action.userId) {
                    return user;
                }
            })
        };
    }

    if (action.type == "USER_JOINED") {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.user]
        };
    }

    return state;
}
