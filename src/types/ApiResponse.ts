import { Message } from "@/model/Message";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAccesptingMessages?: boolean
    messages?: Array<Message>
}