export interface CreateMessageRequest {
    conversationId: number;
    senderRole: string;
    content: string;
}