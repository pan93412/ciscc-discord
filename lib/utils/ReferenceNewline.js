"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ReferenceNewline(message) {
    let msgBuf = message;
    msgBuf = msgBuf.trim();
    msgBuf = (msgBuf[0] == ">" ? "\n" : "") + msgBuf;
    return msgBuf;
}
exports.default = ReferenceNewline;
