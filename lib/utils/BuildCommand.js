"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Build the corresponded command that can be used on
 * Discord from the desired command.
 */
function BuildCommand(identifier, command) {
    // !ciscc::cmdtest
    return `!${identifier}::${command}`;
}
exports.default = BuildCommand;
