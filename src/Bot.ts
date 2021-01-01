import Discord from 'discord.js';
import Message from './Message';

/**
 * This class represents a Discord bot.
 */
export default class Bot {
  /**
   * SINGLETON MODE: The instance.
   */
  instance: Bot | undefined;

  /**
   * The identifier of this Discord bot.
   */
  identifier: string = 'ciscc';

  /**
   * The Discord client instance.
   */
  client: Discord.Client | undefined;

  /**
   * The channel to send.
   */
  channel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel | undefined;

  set Channel(channel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel) {
    this.channel = channel;
    console.info(`info: the default text channel has been set to ${this.channel.id}`);
  }

  /**
   * Construct and set up this object.
   *
   * Note that this object is singleton,
   * therefore any changes to this object
   * will be applied to other Bot.
   */
  constructor() {
    if (this.instance) return this.instance;

    this.instance = this;
    this.client = new Discord.Client();
    this.client.on('ready', () => {
      if (this.client) console.log(`info: logged in as ${this.client.user?.tag}`);
    });

    this.registerChannelHandler();
  }

  /**
   * The handler for setting the default channel to send.
   */
  private registerChannelHandler() {
    this.client?.on('message', (message) => {
      if (message.content === this.cmd('RegisterChannel')) {
        if (Bot.checkPermission(message.member, 'MANAGE_ROLES')) {
          this.Channel = message.channel;
          message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
        } else {
          message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
        }
      }
    });
  }

  /**
   * Get the corresponded command that can be used on
   * Discord from the desired command.
   * */
  cmd(command: string): string {
    // !ciscc::cmdtest
    return `!${this.identifier}::${command}`;
  }

  /**
   * Send the message in the `message` object.
   *
   * @param message The message object.
   * @see Message
   */
  sendMessageObject(message: Message) {
    if (this.channel) {
      this.channel.send(message.toString());
    } else {
      console.warn('warning: nobody specified the text channel to send.');
    }
  }

  /**
   * Build the service notification message.
   *
   * @param message The original message to be sent.
   */
  buildNotification(message: string) {
    return `${message} (${this.identifier})`;
  }

  /**
   * Check if the permission is satisfied.
   *
   * @param member The member object.
   * @param permission The permission that needs to be satisfied.
   */
  static checkPermission(
    member: Discord.GuildMember | null,
    permission: Discord.PermissionString,
  ): boolean {
    if (member) return member.hasPermission(permission);
    return false;
  }

  /**
   * Login to Discord service.
   * @param token The Discord token.
   */
  async login(token: string): Promise<string | undefined> {
    return this.client?.login(token);
  }
}
