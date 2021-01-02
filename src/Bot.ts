import Discord from 'discord.js';
import { EventEmitter } from 'events';
import EventsList from './EventsList';
import Message from './Message';
import BuildCommand from './utils/BuildCommand';
import BuildNotification from './utils/BuildNotification';
import CheckPermission from './utils/CheckPermission';

/**
 * This class represents a Discord bot.
 */
export default class Bot extends EventEmitter {
  /**
   * SINGLETON MODE: The instance.
   */
  private instance: Bot | undefined;

  /**
   * The identifier of this Discord bot.
   */
  identifier = 'ciscc';

  /**
   * The Discord client instance.
   */
  readonly client: Discord.Client | undefined;

  /**
   * The channel ID to send.
   */
  private channelId: string | undefined;

  /**
   * Construct and set up this object.
   *
   * Note that this object is singleton,
   * therefore any changes to this object
   * will be applied to other Bot.
   */
  constructor() {
    super();
    if (this.instance) return this.instance;

    this.instance = this;
    this.client = new Discord.Client();
    this.client.on('ready', () => {
      if (this.client) console.info(`info: logged in as ${this.client.user?.tag}`);
    });

    this.setChannelHandler();
  }

  get ChannelId(): string | undefined {
    return this.channelId;
  }

  set ChannelId(channelId: string | undefined) {
    this.channelId = channelId;
    console.info(`info: the default text channel has been set to ${channelId}`);
  }

  /**
   * Receive the Channel object.
   */
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

  /**
   * Store the Channel object.
   * @param channel The Channel object.
   */
  setChannel(channel: Discord.Channel): void {
    this.ChannelId = channel.id;
    this.emit(EventsList.CHANNEL_CHANGED, channel.id);
  }

  /**
   * The handler for setting the default channel to send.
   */
  private setChannelHandler() {
    this.client?.on('message', (message) => {
      if (message.content === this.buildCommand('SetChannel')) {
        if (CheckPermission(message.member, 'MANAGE_ROLES')) {
          this.setChannel(message.channel);
          message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
        } else {
          message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
        }
      }
    });
  }

  /** @see BuildCommand */
  buildCommand(command: string): string {
    return BuildCommand(this.identifier, command);
  }

  /**
   * Send the message in the `message` object.
   *
   * @param message The message object.
   * @see Message
   */
  async sendMessageObject(message: Message): Promise<Discord.Message | undefined> {
    const channel = await this.getChannel();

    // hacky: we force `channel' to be Discord.TextChannel
    // so we can use 'send' method. But we also check if
    // `channel' has 'send' method since not every conditions
    // support 'send' method.
    if (channel && (<Discord.TextChannel>channel).send) {
      const sentMessage = await (<Discord.TextChannel>channel).send(message.toString());
      this.emit(EventsList.MESSAGE_SENT, message);
      return sentMessage;
    }

    console.warn('warning: nobody specified the text channel to send.');
    return undefined;
  }

  /** @see BuildNotification */
  buildNotification(message: string): string {
    return BuildNotification(this.identifier, message);
  }

  /**
   * Login to Discord service.
   * @param token The Discord token.
   */
  async login(token: string): Promise<string | undefined> {
    return this.client?.login(token);
  }
}
