# CISCC Discord Lib - Events
Last-Update-On: 1/2/2021

See src/EventsList.ts for more informations.

## `channel_changed`
It will be emitted when the channel has been changed.

### Arguments
- `channel`: `number`

### Example
```typescript
const bot = new Bot();
bot.on('channel_changed', (channel: number) => {
    console.log(`The channel has been changed to ${channel}.`)
})
```

## `message_sent`
It will be emitted when a message has been sent to the channel.

### Arguments
- `message`: `Message`

### Example
```typescript
const bot = new Bot();
bot.on('message_sent', (message: Message) => {
    console.log(message.toString());
})
```
