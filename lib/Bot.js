"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
/**
 * This class represents a Discord bot.
 */
class Bot {
    /**
     * Construct and set up this object.
     *
     * Note that this object is singleton,
     * therefore any changes to this object
     * will be applied to other Bot.
     */
    constructor() {
        /**
         * The identifier of this Discord bot.
         */
        this.identifier = 'ciscc';
        if (this.instance)
            return this.instance;
        this.instance = this;
        this.client = new discord_js_1.default.Client();
        this.client.on('ready', () => {
            var _a;
            if (this.client)
                console.info(`info: logged in as ${(_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
        });
        this.setChannelHandler();
    }
    /**
     * Receive the Channel object.
     */
    getChannel() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channelId) {
                return (_a = this.client) === null || _a === void 0 ? void 0 : _a.channels.fetch(this.channelId);
            }
            return undefined;
        });
    }
    /**
     * Store the Channel object.
     * @param channel The Channel object.
     */
    setChannel(channel) {
        this.channelId = channel.id;
        console.info(`info: the default text channel has been set to ${channel.id}`);
    }
    /**
     * The handler for setting the default channel to send.
     */
    setChannelHandler() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.on('message', (message) => {
            if (message.content === this.buildCommand('SetChannel')) {
                if (Bot.checkPermission(message.member, 'MANAGE_ROLES')) {
                    this.setChannel(message.channel);
                    message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
                }
                else {
                    message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
                }
            }
        });
    }
    /**
     * Build the corresponded command that can be used on
     * Discord from the desired command.
     * */
    buildCommand(command) {
        // !ciscc::cmdtest
        return `!${this.identifier}::${command}`;
    }
    /**
     * Send the message in the `message` object.
     *
     * @param message The message object.
     * @see Message
     */
    sendMessageObject(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel();
            // hacky: we force `channel' to be Discord.TextChannel
            // so we can use 'send' method. But we also check if
            // `channel' has 'send' method since not every conditions
            // support 'send' method.
            if (channel && channel.send) {
                channel.send(message.toString());
            }
            else {
                console.warn('warning: nobody specified the text channel to send.');
            }
        });
    }
    /**
     * Build the service notification message.
     *
     * @param message The original message to be sent.
     */
    buildNotification(message) {
        return `${message} (${this.identifier})`;
    }
    /**
     * Check if the permission is satisfied.
     *
     * @param member The member object.
     * @param permission The permission that needs to be satisfied.
     */
    static checkPermission(member, permission) {
        if (member)
            return member.hasPermission(permission);
        return false;
    }
    /**
     * Login to Discord service.
     * @param token The Discord token.
     */
    login(token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.client) === null || _a === void 0 ? void 0 : _a.login(token);
        });
    }
}
exports.default = Bot;
