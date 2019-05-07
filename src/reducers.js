export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendsList: action.friendsList
        };
    } else if (action.type == "REJECT_FRIENDS") {
        state = {
            ...state,
            friendsList: state.friendsList.filter(friend => {
                return friend.id != action.senderId;
            })
        };
    } else if (action == "ACCEPT_FRIENDS") {
        state = {
            ...state,
            friendsList: state.friendsList.map(friend => {
                if (friend.id == action.recipientId) {
                    friend.status = "done";
                }
                return friend;
            })
        };
    }
    return state;
}
