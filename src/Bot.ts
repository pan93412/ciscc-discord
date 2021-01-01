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
            if (this.client)
                console.log(`info: logged in as ${this.client.user?.tag}`);
        });
        this.client.on('message', this.registerChannelHandler(this));
    }

    private registerChannelHandler(instance: Bot) {
        return function (message: Discord.Message) {
            if (message.content === `!${instance.identifier}::registerChannel`) {
                if (instance.checkPermission(message.member, 'MANAGE_ROLES')) {
                    instance.channel = message.channel;
                    message.reply(instance.buildNotification('已經成功設定預設發言平台。')); // TODO: i18n
                    console.info(`info: the default text channel has been set to ${instance.channel.id}`)
                } else {
                    message.reply(instance.buildNotification('您無權執行本動作。')); // TODO: i18n
                }
            }
        }
    }

    checkPermission(member: Discord.GuildMember | null, permission: Discord.PermissionString): boolean {
        if (member) return member.hasPermission(permission);
        return false;
    }

    sendMessageObject(message: Message) {
        if (this.channel) {
            this.channel.send(message.toString());
        } else {
            console.warn('warning: nobody specified the text channel to send.')
        }
    }

    buildNotification(message: string) {
        return `${message} (${this.identifier})`;
    }

    async login(token: string): Promise<string | undefined> {
        return await this.client?.login(token);
    }
}
