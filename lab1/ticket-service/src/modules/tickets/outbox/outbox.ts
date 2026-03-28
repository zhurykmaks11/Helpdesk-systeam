interface OutboxEvent {
    id: string;
    type: string;
    payload: any;
    processed: boolean;
}

export const outbox: OutboxEvent[] = [];