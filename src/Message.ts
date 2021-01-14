/**
 * A complaint message to send to Discord.
 */
export default class Message {
    /** The UTF-8 message to be sent. */
    message = '';

    /** @unused */
    reviewer = '';

    // IMPL: Unix Timestamp?
    submittedAt: number = Date.now();

    /** @unused */
    reviewedAt: number = Date.now();

    toString(): string {
      return [
        `[匿名] ${this.message}`,
        '',
        `發表時間：${new Date(this.submittedAt).toLocaleString()}`,
      ].join('\r\n');
    }
}
