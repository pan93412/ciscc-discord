import Message from './Message';
import ReferenceNewline from './utils/ReferenceNewline';
import RemoveMentions from './utils/RemoveMentions';

/**
 * The builder for @see Message
 */
export default class MessageBuilder {
    message: Message = new Message();

    setMessage(message: string): MessageBuilder {
      this.message.message = RemoveMentions(ReferenceNewline(message));
      return this;
    }

    setSubmittedAt(submittedAt: number): MessageBuilder {
      this.message.submittedAt = submittedAt;
      return this;
    }

    setReviewedAt(reviewedAt: number): MessageBuilder {
      this.message.reviewedAt = reviewedAt;
      return this;
    }

    build(): Message {
      return this.message;
    }
}
