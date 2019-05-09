import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/api/friends");
    return {
        type: "RECEIVE_FRIENDS",
        friends: data.friends
    };
}

export async function acceptFriend(id) {
    await axios.post("/friendship/accept/" + id);

    return {
        type: "ACCEPT_FRIEND",
        id
    };
}

export async function unfriend(id) {
    await axios.post("/friendship/unfriend/" + id);
    return {
        type: "UNFRIEND",
        id
    };
}

export function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        users
    };
}

export function userLeft(userId) {
    console.log("userLeft action running, userId:", userId);
    return {
        type: "USER_LEFT",
        userId
    };
}

export function userJoined(user) {
    console.log("userJoined action running, user:", user);
    return {
        type: "USER_JOINED",
        user
    };
}

export function receiveChat(chatMessages) {
    return {
        type: "RECEIVE_CHAT",
        chatMessages
    };
}

export function newChatMessage(chatMessage) {
    return {
        type: "NEW_CHAT_MESSAGE",
        chatMessage
    };
}

export function searchResults(names) {
    return {
        type: "SEARCH_RESULTS",
        names
    };
}

export function clearSearch() {
    return {
        type: "CLEAR_SEARCH"
    };
}
