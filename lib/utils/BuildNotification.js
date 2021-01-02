"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Build the service notification message.
 *
 * @param identifier The identifier of this service.
 * @param message The service message.
 */
function BuildNotification(identifier, message) {
    return `${message} (${identifier})`;
}
exports.default = BuildNotification;
