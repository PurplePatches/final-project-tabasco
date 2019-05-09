export default function reducer(state = {}, action) {
    switch (action.type) {
        case "GET_FRIENDSHIPS":
            return Object.assign({}, state, {
                users: action.users
            });
            break;
        case "ACCEPT_FRIENDSHIP":
            const newUser = state.users.map(user => {
                if (user.id == action.id) {
                    user.status = true;
                }
                return user;
            });
            return Object.assign({}, state, {
                users: newUser
            });
        case "REJECT_FRIENDSHIP":
            const newUsers = state.users.map(user => {
                if (user.id == action.id) {
                    user.status = null;
                }
                return user;
            });
            return Object.assign({}, state, {
                users: newUsers
            });
            break;
        case "ONLINE_USERS":
            return Object.assign({}, state, {
                ...state,
                onlineusers: action.onlineusers
            });
        case "ONLINE_USERS":
            return Object.assign({}, state, {
                ...state,
                onlineusers: action.onlineusers
            });
        case "USER_JOINED":
            return Object.assign({}, state, {
                onlineusers: state.onlineusers.concat(action.onlineusers)
            });
            break;
        case "USER_LEFT":
            console.log("Reducing the ", action.user);
            return Object.assign({}, state, {
                ...state,
                onlineusers: state.onlineusers.filter(user => {
                    return user.id != action.user;
                })
            });
            break;
        case "GET_PUBLIC_MESSAGES":
            console.log("Reducing the ", action);
            return Object.assign({}, state, {
                ...state,
                chats: action.chats.reverse()
            });
            break;
        case "NEW_PUBLIC_MESSAGE":
            console.log("Reducing the ", action);
            return Object.assign({}, state, {
                ...state,
                chats: [...state.chats, action.chat]
            });
            break;
    }
    return state;

    // if (action.type == "GET_FRIENDSHIPS") {
    //     return Object.assign({}, state, {
    //         users: action.users
    //     });
    // }
    //
    // if (action.type == "GET_FRIENDSHIPS") {
    //     return Object.assign({}, state, {
    //         users: action.users
    //     });
    // }
    // if (action.type == "UPDATE_BIO") {
    //     const user = { ...state.user, bio: action.bio };
    //     return { ...state, user };
    // }
    // return state;
}
