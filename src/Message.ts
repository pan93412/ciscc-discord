/**
 * A complaint message to send to Discord.
 */
export default class Message {
    /** The UTF-8 message to be sent. */
    message: string = '';

    /** @unused */
    reviewer: string = '';

    // IMPL: Unix Timestamp?
    /** @unused */
    submittedAt: number = Date.now();

    /** @unused */
    reviewedAt: number = Date.now();

    toString() {
      return `[匿名] ${this.message}`;
    }
}
