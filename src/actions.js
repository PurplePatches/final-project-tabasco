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
