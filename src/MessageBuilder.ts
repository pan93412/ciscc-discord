import Message from './Message';

export default class MessageBuilder {
    message: Message = new Message();

    setMessage(message: string): MessageBuilder {
      this.message.message = message;
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
