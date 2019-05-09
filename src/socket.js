import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    receiveChat,
    newChatMessage
} from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            console.log("user in userJoined listener", user);
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", userId => {
            store.dispatch(userLeft(userId));
        });

        socket.on("gotChat", chatMessages => {
            store.dispatch(receiveChat(chatMessages));
        });

        socket.on("gotNewChatMessage", chatMessage => {
            store.dispatch(newChatMessage(chatMessage));
        });
    }
}
