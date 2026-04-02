export interface WMMessage {
    _id: string;
    type: "route" | "broadcast" | "room-message";
    payload: unknown;
    senderId: string;
    recipientId: string | null;
    roomId: string | null;
    isBroadcast: boolean;
    timestamp: string;
}
export interface MessagingStoreOptions {
    historyLimit?: number;
    storagePrefix?: string;
}
export interface MessagingStore {
    readonly userId: string | null;
    setDisplayName(name: string): void;
    getDisplayName(): string | null;
    send(to: string, payload: unknown): void;
    broadcast(payload: unknown): void;
    joinRoom(partnerId: string): void;
    sendRoomMessage(payload: unknown): void;
    loadHistory(): Promise<WMMessage[]>;
    getCachedHistory(): WMMessage[];
    clearHistory(): void;
    getUnread(): number;
    resetUnread(): void;
    getUsers(): string[];
    isConnected(): boolean;
    onMessage(cb: (msg: WMMessage) => void): () => void;
    onUserList(cb: (users: string[]) => void): () => void;
    onTyping(cb: (userId: string, isTyping: boolean) => void): () => void;
    destroy(): void;
}
export declare function createMessagingStore(socket: any, options?: MessagingStoreOptions): MessagingStore;
//# sourceMappingURL=index.d.ts.map