"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Build the corresponded command that can be used on
 * Discord from the desired command.
 */
function CheckPermission(member, permission) {
    if (member)
        return member.hasPermission(permission);
    return false;
}
exports.default = CheckPermission;
