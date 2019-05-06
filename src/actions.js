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
