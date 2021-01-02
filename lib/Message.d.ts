/**
 * A complaint message to send to Discord.
 */
export default class Message {
    /** The UTF-8 message to be sent. */
    message: string;
    /** @unused */
    reviewer: string;
    /** @unused */
    submittedAt: number;
    /** @unused */
    reviewedAt: number;
    toString(): string;
}
