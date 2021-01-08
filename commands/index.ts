import { Message } from 'discord.js';

export const processCommand = (receivedMessage: Message): void => {
  const fullCommand = receivedMessage.content.substr(1);
  const splitCommand = fullCommand.split(' ');
  const primaryCommand = splitCommand[0];
  const args = splitCommand.slice(1);

  switch (primaryCommand) {
    case 'help':
      helpCommand(args, receivedMessage);
      break;
    case 'random':
      randomCommand(receivedMessage);
      break;
    default:
      receivedMessage.channel.send('Unknown command. Try `!help`');
  }
};

const helpCommand = (args: string[], receivedMessage: Message): any => {
  if (args.length === 0)
    return receivedMessage.channel.send(
      'I am not sure what you are looking for'
    );
  receivedMessage.channel.send(
    `Looks like you need help with ${args.join(' ')}`
  );
};

const randomCommand = (receivedMessage: Message): void => {
  receivedMessage.channel.send(Math.floor(Math.random() * 1000));
};
