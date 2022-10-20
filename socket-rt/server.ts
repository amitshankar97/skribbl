import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./common/interactions.interface";

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(8080);

io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", () => {
        console.warn(`${socket.id} disconnected`);
        io.to(socket.data.roomId).emit("userLeft", socket.data.name);
        socket.leave(socket.data.roomId);
    });

    socket.on("joinRoom", (roomId: string, name: string) => {
        socket.data.name = name;
        socket.data.roomId = roomId;

        console.log(`joining user: ${socket.data.name} from socket: ${socket.id} to room: ${roomId}`);
        io.to(roomId).emit("newUserJoined", socket.data.name);
        socket.join(roomId);
    });

    socket.on("leaveRoom", () => {
        console.log(`removing user: ${socket.data.name} from socket: ${socket.id} from room: ${socket.data.roomId}`);
        io.to(socket.data.roomId).emit("userLeft", socket.data.name);
        socket.leave(socket.data.roomId);
    });

    socket.on("sendMessage", (message: string) => {
        console.log(`user: ${socket.data.name} from socket: ${socket.id} sending message: ${message} to room: ${socket.data.roomId}`);
        io.to(socket.data.roomId).emit("newMessage", socket.data.name, message);
    });
});
