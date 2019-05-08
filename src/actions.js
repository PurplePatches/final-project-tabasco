import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/api/friends");
    return {
        type: "RECEIVE_FRIENDS",
        friendsList: data
    };
}

export async function rejectFriends(senderId) {
    const { data } = await axios.post("/" + senderId + "/friends/reject");
    return {
        type: "REJECT_FRIENDS",
        senderId
    };
}

export async function acceptFriends(recipientId) {
    const { data } = await axios.post("/" + recipientId + "/friends/accept");
    return {
        type: "ACCEPT_FRIENDS",
        recipientId
    };
}

export async function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        users
    };
}

export async function userJoined(user) {
    return {
        type: "USER_JOINED",
        user
    };
}

export async function userLeft(user) {
    return {
        type: "USER_LEFT",
        user
    };
}

export async function addNewChatToRedux(data) {
    return {
        type: "ADD_NEW_CHAT",
        data
    };
}
