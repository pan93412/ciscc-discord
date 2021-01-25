export default function ReferenceNewline(message: string): string {
  let msgBuf = message;

  msgBuf = msgBuf.trim();
  msgBuf = (msgBuf[0] == ">" ? "\n" : "") + msgBuf;

  return msgBuf;
}
