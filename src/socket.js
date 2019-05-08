import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        console.log("in the init");
        socket = io.connect();

        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", userId => {
            store.dispatch(userLeft(userId));
        });
    }
};
