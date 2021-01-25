"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Removes dangerous pings such as @everyone and @here from the message.
 *
 * @param message The message object
 * @see {Message}
 */
function RemoveMentions(message) {
    // We adds a zero width space to the ping.
    message = message.replace(/@([^<>@ ]*)/gmsu, (_match, target) => {
        if (target.match(/^[&!]?\d+$/)) {
            return `@${target}`;
        }
        else {
            return `@\u200b${target}`;
        }
    });
    return message;
}
exports.default = RemoveMentions;
