export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendsList: action.friendsList
        };
    }
    if (action.type == "REJECT_FRIENDS") {
        state = {
            ...state,
            friendsList: state.friendsList.filter(
                friend => friend.id != action.senderId
            )
        };
    }
    if (action.type == "ACCEPT_FRIENDS") {
        state = {
            ...state,
            friendsList: state.friendsList.map(friend => {
                if (friend.id == action.recipientId) {
                    return { ...friend, status: "done" };
                } else {
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
    if (action.type == "USER_JOINED") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.concat(action.user)
        };
    }
    if (action.type == "USER_LEFT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.user
            )
        };
    }
    return state;
}
