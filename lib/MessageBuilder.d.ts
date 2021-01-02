import Message from './Message';
/**
 * The builder for @see Message
 */
export default class MessageBuilder {
    message: Message;
    setMessage(message: string): MessageBuilder;
    setSubmittedAt(submittedAt: number): MessageBuilder;
    setReviewedAt(reviewedAt: number): MessageBuilder;
    build(): Message;
}
