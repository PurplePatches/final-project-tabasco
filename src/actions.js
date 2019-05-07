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
