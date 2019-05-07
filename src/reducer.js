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

    return state;
}
