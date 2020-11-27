import { UserModel } from './User';

export interface IncomingMessage {
    // User: Partial<UserModel> | null;
    Message: string;
    // Timestamp: Date;
}

export interface OutgoingMessage {
    // User: Partial<UserModel> | null;
    Message: string;
}