// * actions.js
//     * `receiveFriends` - makes ajax request to get friends and returns an action with the friends as the value of a property
//     * `acceptFriendRequest` - makes ajax request to accept a request and returns an action with the id of the user whose friend request was accepted as the value of a property
//     * `unfriend` - makes ajax request to unfriend and returns an action with the id of the unfriended user as the value of a property
import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/friends/a");
    return {
        type: "RECEIVE_FRIENDS",
        users: data
    };
}

export async function acceptFriend(otherId) {
    const { data } = await axios.post("/accept", {
        otherId: otherId
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        otherId
    };
}

export async function unfriend(otherId) {
    const { data } = await axios.post("/unfriend", {
        otherId: otherId
    });
    return {
        type: "UNFRIEND",
        otherId
    };
}

export function onlineUsers(data) {
    return {
        type: "GET_ONLINE_USERS",
        online: data
    };
}

export function userLeft(userId) {
    return {
        type: "USER_LEFT",
        userId
    };
}

export function userJoined(userId) {
    return {
        type: "USER_JOINED",
        userId
    };
}

export function getMessages(data) {
    return {
        type: "GET_MESSAGES",
        data
    };
}

export function newChatMessage(data) {
    return {
        type: "NEW_CHAT_MESSAGE",
        data
    };
}
//NEED ONLINEUSERS / USERJOINED / USERLEFT
