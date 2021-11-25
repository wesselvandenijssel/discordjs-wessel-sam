// module.exports={}
import { ICommand } from "wokcommands";

export default {
  category: "Fun",
  description: "clear", // Required for slash commands
  permissions: ["ADMINISTRATOR"],
  slash: "both",
  testOnly: true,
  // guildOnly: true,
  minArgs: 1,
  expectedArgs: "<amount>",
  expectedArgsTypes: ["STRING"],

  callback: async({ message, interaction, channel, args }) => {
    const amount = args.length ? parseInt(args.shift()!) : 10;

    if (message){
      await message.delete()
    }
    //bulk
    // const { size } = await channel.bulkDelete(amount, true)

    const messages = await channel.messages.fetch({ limit: amount})
    const { size } = messages
    messages.forEach((message) => message.delete())


    const reply = `Deleted ${size} message(s)`

    if (interaction){
      return reply
    }

    channel.send(reply)
  },
} as ICommand;
