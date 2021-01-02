import Discord from 'discord.js';
import Message from './Message';
/**
 * This class represents a Discord bot.
 */
export default class Bot {
    /**
     * SINGLETON MODE: The instance.
     */
    private instance;
    /**
     * The identifier of this Discord bot.
     */
    identifier: string;
    /**
     * The Discord client instance.
     */
    client: Discord.Client | undefined;
    /**
     * The channel ID to send.
     */
    private channelId;
    /**
     * Receive the Channel object.
     */
    getChannel(): Promise<Discord.Channel | Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel | undefined>;
    /**
     * Store the Channel object.
     * @param channel The Channel object.
     */
    setChannel(channel: Discord.Channel): void;
    /**
     * Construct and set up this object.
     *
     * Note that this object is singleton,
     * therefore any changes to this object
     * will be applied to other Bot.
     */
    constructor();
    /**
     * The handler for setting the default channel to send.
     */
    private setChannelHandler;
    /**
     * Build the corresponded command that can be used on
     * Discord from the desired command.
     * */
    buildCommand(command: string): string;
    /**
     * Send the message in the `message` object.
     *
     * @param message The message object.
     * @see Message
     */
    sendMessageObject(message: Message): Promise<void>;
    /**
     * Build the service notification message.
     *
     * @param message The original message to be sent.
     */
    buildNotification(message: string): string;
    /**
     * Check if the permission is satisfied.
     *
     * @param member The member object.
     * @param permission The permission that needs to be satisfied.
     */
    static checkPermission(member: Discord.GuildMember | null, permission: Discord.PermissionString): boolean;
    /**
     * Login to Discord service.
     * @param token The Discord token.
     */
    login(token: string): Promise<string | undefined>;
}
