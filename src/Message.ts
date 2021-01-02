import crypto from 'crypto';

/**
 * A complaint message to send to Discord.
 */
export default class Message {
    static hash = crypto.createHash('sha256');

    /** The UTF-8 message to be sent. */
    message = '';

    /** @unused */
    reviewer = '';

    // IMPL: Unix Timestamp?
    /** @unused */
    submittedAt: number = Date.now();

    /** @unused */
    reviewedAt: number = Date.now();

    get Id(): string {
      Message.hash.update(`${this.message}${this.submittedAt.toString()}`);
      return Message.hash.digest('hex');
    }

    toString(): string {
      return [
        `[匿名] ${this.message}`,
        '',
        `發表時間：${new Date(this.submittedAt).toLocaleString()}`,
        `訊息的唯一 ID：${this.Id}`,
      ].join('\r\n');
    }
}
