import Discord from 'discord.js';
import Message from './Message';

export default class Bot {
  instance: Bot | undefined;

  identifier: string = 'ciscc';

  client: Discord.Client | undefined;

  channel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel | undefined;

  constructor() {
    if (this.instance) return this.instance;

    this.instance = this;
    this.client = new Discord.Client();
    this.client.on('ready', () => {
      if (this.client) console.log(`info: logged in as ${this.client.user?.tag}`);
    });

    this.registerChannelHandler();
  }

  private registerChannelHandler() {
    this.client?.on('message', (message) => {
      if (message.content === `!${this.identifier}::registerChannel`) {
        if (Bot.checkPermission(message.member, 'MANAGE_ROLES')) {
          this.channel = message.channel;
          message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
          console.info(`info: the default text channel has been set to ${this.channel.id}`);
        } else {
          message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
        }
      }
    });
  }

  static checkPermission(
    member: Discord.GuildMember | null,
    permission: Discord.PermissionString,
  ): boolean {
    if (member) return member.hasPermission(permission);
    return false;
  }

  sendMessageObject(message: Message) {
    if (this.channel) {
      this.channel.send(message.toString());
    } else {
      console.warn('warning: nobody specified the text channel to send.');
    }
  }

  buildNotification(message: string) {
    return `${message} (${this.identifier})`;
  }

  async login(token: string): Promise<string | undefined> {
    return this.client?.login(token);
  }
}
