import Discord from 'discord.js';
import Message from './Message';

/**
 * This class represents a Discord bot.
 */
export default class Bot {
  /**
   * SINGLETON MODE: The instance.
   */
  private instance: Bot | undefined;

  /**
   * The identifier of this Discord bot.
   */
  identifier: string = 'ciscc';

  /**
   * The Discord client instance.
   */
  client: Discord.Client | undefined;

  /**
   * The channel ID to send.
   */
  private channelId: string | undefined;

  async getChannel():
    Promise<
      Discord.Channel
        | Discord.TextChannel
        | Discord.DMChannel
        | Discord.NewsChannel
        | undefined
        > {
    if (this.channelId) {
      return this.client?.channels.fetch(this.channelId);
    }
    return undefined;
  }

  setChannel(channel: Discord.Channel) {
    this.channelId = channel.id;
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
      if (this.client) console.info(`info: logged in as ${this.client.user?.tag}`);
    });

    this.setChannelHandler();
  }

  /**
   * The handler for setting the default channel to send.
   */
  private setChannelHandler() {
    this.client?.on('message', (message) => {
      if (message.content === this.buildCommand('SetChannel')) {
        if (Bot.checkPermission(message.member, 'MANAGE_ROLES')) {
          this.setChannel(message.channel);
          message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
        } else {
          message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
        }
      }
    });
  }

  /**
   * Build the corresponded command that can be used on
   * Discord from the desired command.
   * */
  buildCommand(command: string): string {
    // !ciscc::cmdtest
    return `!${this.identifier}::${command}`;
  }

  /**
   * Send the message in the `message` object.
   *
   * @param message The message object.
   * @see Message
   */
  async sendMessageObject(message: Message) {
    const channel = await this.getChannel();

    // hacky: we force `channel' to be Discord.TextChannel
    // so we can use 'send' method. But we also check if
    // `channel' has 'send' method since not every conditions
    // support 'send' method.
    if (channel && (<Discord.TextChannel>channel).send) {
      (<Discord.TextChannel>channel).send(message.toString());
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
