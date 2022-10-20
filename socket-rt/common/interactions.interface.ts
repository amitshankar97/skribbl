export type NewMessageHandler = (senderName: string, message: string) => void;

export interface ServerToClientEvents {
    newUserJoined: (name: string) => void;
    userLeft: (name: string) => void;
    newMessage: NewMessageHandler;
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string, name: string) => void;
    leaveRoom: () => void;
    sendMessage: (message: string) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    roomId: string;
}