import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    getLastMessages,
    addNewChatToRedux
} from "./actions";

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

        socket.on("chatMessages", data => {
            store.dispatch(getLastMessages(data));
        });

        socket.on("chatMessageForRedux", data => {
            console.log("In Socket.js ", data);
            store.dispatch(addNewChatToRedux(data));
        });
    }
};
