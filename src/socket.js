import * as io from "socket.io-client";
import { onlineUsers, usersJoines, userLeft } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("usersJoines", user => {});

        socket.on("userLeft", user => {});
    }
}
