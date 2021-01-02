"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A complaint message to send to Discord.
 */
class Message {
    constructor() {
        /** The UTF-8 message to be sent. */
        this.message = '';
        /** @unused */
        this.reviewer = '';
        // IMPL: Unix Timestamp?
        /** @unused */
        this.submittedAt = Date.now();
        /** @unused */
        this.reviewedAt = Date.now();
    }
    toString() {
        return [
            `[匿名] ${this.message}`,
            '',
            `發表時間：${new Date(this.submittedAt).toLocaleString()}`,
        ].join('\r\n');
    }
}
exports.default = Message;
