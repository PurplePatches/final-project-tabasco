//USED IN START.JS

import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    getMessages,
    newChatMessage
} from "./actions";

export let socket;

//we need store for dispatch

export function init(store) {
    if (!socket) {
        socket = io.connect();
        //data should be an array with 10 or fewer objs socket.on("chatMessages", data => {
        //     store.dispatch(getMostRecentChats(data));
        // });
        //DATA is what was sent to the front (see index.Js)
        socket.on("onlineUsers", data => {
            //TAKE ARRAY AND DISPATCH (link to redux)
            console.log(data, "user inside onlineUsers socket");
            store.dispatch(onlineUsers(data));
        });

        // socket.on("userJoined", user => {});
        //
        socket.on("userLeft", userId => {
            store.dispatch(userLeft(userId));
        });

        socket.on("userJoined", userId => {
            store.dispatch(userJoined(userId));
        });

        socket.on("getMessages", data => {
            store.dispatch(getMessages(data));
        });

        socket.on("newChatMessage", data => {
            console.log("a new message arrived", data);
            store.dispatch(newChatMessage(data));
        });
        socket.on("disconnect");
    }
    return socket;
}
