/// <reference types="node" />
import Discord from 'discord.js';
import { EventEmitter } from 'events';
import Message from './Message';
/**
 * This class represents a Discord bot.
 */
export default class Bot extends EventEmitter {
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
    readonly client: Discord.Client | undefined;
    /**
     * The channel ID to send.
     */
    private channelId;
    /**
     * Construct and set up this object.
     *
     * Note that this object is singleton,
     * therefore any changes to this object
     * will be applied to other Bot.
     */
    constructor();
    get ChannelId(): string | undefined;
    set ChannelId(channelId: string | undefined);
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
     * The handler for setting the default channel to send.
     */
    private setChannelHandler;
    /** @see BuildCommand */
    buildCommand(command: string): string;
    /**
     * Send the message in the `message` object.
     *
     * @param message The message object.
     * @see Message
     */
    sendMessageObject(message: Message): Promise<Discord.Message | undefined>;
    /** @see BuildNotification */
    buildNotification(message: string): string;
    /**
     * Login to Discord service.
     * @param token The Discord token.
     */
    login(token: string): Promise<string | undefined>;
}
