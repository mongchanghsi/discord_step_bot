require('dotenv').config();
import { Client, Message, MessageEmbed } from 'discord.js';
import { callAssistant } from './watson';
import { processCommand } from './commands';
import { multiLine } from './utils';

const client: Client = new Client();

// ready event is fired whenever the server starts
client.on('ready', () => {
  if (!client.user) {
    throw Error('Internal Server Error: No Client Found');
  }
  console.log('Connected as ' + client.user.tag);

  // Set the status of the bot
  client.user.setActivity('with oppai');
});

client.on('message', async (receivedMessage: Message) => {
  // Check if the sender is the bot itself
  if (receivedMessage.author == client.user) return;

  if (receivedMessage.content.startsWith('!')) {
    processCommand(receivedMessage);
  } else if (receivedMessage.content.startsWith('hey jarvis')) {
    let response: string = await callAssistant(
      receivedMessage.content.slice(11)
    );

    // Remove the "" in the response string
    response = response.slice(1, -1);
    if (response.includes('\\n')) {
      response = multiLine(response);
    }
    receivedMessage.channel.send(response);
  }
});

client.login(process.env.DISCORD_TOKEN);

// client.guilds.cache.forEach((guild: any) => {
//   console.log(guild.name);
//   guild.channels.cache.forEach((channel: any) => {
//     console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
//   });
// });

// Text Channel id - 794910135012818999
// const generalChannel: any = client.channels.cache.get('794910135012818999');
// generalChannel.send('asd');
