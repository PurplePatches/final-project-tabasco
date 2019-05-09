import axios from "axios";

export async function fetchFriends() {
    const { data } = await axios.get("/friends/fetchUsers");
    return {
        type: "FETCH_FRIENDS",
        users: data
    };
}

export async function acceptFriendship(id) {
    const { data } = await axios.post(`/user/${id}/acceptFriendship`);
    return {
        type: "ACCEPT_FRIENDSHIP",
        id
    };
}

export async function endFriendship(id) {
    const { data } = await axios.post(`/user/${id}/deleteFriendship`);
    return {
        type: "DELETE_FRIENDSHIP"
    };
}
