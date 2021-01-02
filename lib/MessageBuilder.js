"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("./Message"));
/**
 * The builder for @see Message
 */
class MessageBuilder {
    constructor() {
        this.message = new Message_1.default();
    }
    setMessage(message) {
        this.message.message = message;
        return this;
    }
    setSubmittedAt(submittedAt) {
        this.message.submittedAt = submittedAt;
        return this;
    }
    setReviewedAt(reviewedAt) {
        this.message.reviewedAt = reviewedAt;
        return this;
    }
    build() {
        return this.message;
    }
}
exports.default = MessageBuilder;
