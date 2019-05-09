import axios from "./axios";

export async function receiveFriends() {
    console.log("receivefriends");
    const { data } = await axios.get("/receivefriends");
    console.log("DATA FROM RECEIVE FRIENDS", { data });
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest() {
    const { data } = await axios.get("/acceptfriendrequest");
    console.log("DATA FROM FRIENDS REQUEST", { data });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        solicitationpending: data
    };
}

export function unfriend(id) {
    axios.get("/unfriend").then(data => {
        return {
            type: "UNFRIEND",
            unfriend: id
        };
    });
}

export async function usersmenu() {
    const { data } = await axios.get("/api/usersmenu");
    console.log("USERS MENU DATA", { data });
    return {
        type: "USERSMENU",
        users: data
    };
}
