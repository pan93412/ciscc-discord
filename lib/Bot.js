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
const events_1 = require("events");
const BuildCommand_1 = __importDefault(require("./utils/BuildCommand"));
const BuildNotification_1 = __importDefault(require("./utils/BuildNotification"));
const CheckPermission_1 = __importDefault(require("./utils/CheckPermission"));
/**
 * This class represents a Discord bot.
 */
class Bot extends events_1.EventEmitter {
    /**
     * Construct and set up this object.
     *
     * Note that this object is singleton,
     * therefore any changes to this object
     * will be applied to other Bot.
     */
    constructor() {
        super();
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
    get ChannelId() {
        return this.channelId;
    }
    set ChannelId(channelId) {
        this.channelId = channelId;
        console.info(`info: the default text channel has been set to ${channelId}`);
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
        this.ChannelId = channel.id;
        this.emit("channel_changed" /* CHANNEL_CHANGED */, channel.id);
    }
    /**
     * The handler for setting the default channel to send.
     */
    setChannelHandler() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.on('message', (message) => {
            if (message.content === this.buildCommand('SetChannel')) {
                if (CheckPermission_1.default(message.member, 'MANAGE_ROLES')) {
                    this.setChannel(message.channel);
                    message.reply(this.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
                }
                else {
                    message.reply(this.buildNotification('您無權執行本動作。')); // TODO: i18n
                }
            }
        });
    }
    /** @see BuildCommand */
    buildCommand(command) {
        return BuildCommand_1.default(this.identifier, command);
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
                const sentMessage = yield channel.send(message.toString());
                this.emit("message_sent" /* MESSAGE_SENT */, message);
                return sentMessage;
            }
            console.warn('warning: nobody specified the text channel to send.');
            return undefined;
        });
    }
    /** @see BuildNotification */
    buildNotification(message) {
        return BuildNotification_1.default(this.identifier, message);
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
