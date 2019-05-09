import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";

export let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessageForRedux", data => {
            store.dispatch(addNewChatToRedux(data));
        });
        socket.on("chatMessages", data => {
            // 'data' here should be an array with 10 or fewer objects in it
            store.dispatch(getMostRecentChats(data));
        });
        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {});
        socket.on("userLeft", userId => {});
    }
    return socket;
}
