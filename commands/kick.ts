import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Fun",
  description: "kicks", // Required for slash commands
  permissions: ["ADMINISTRATOR"],
  slash: "both",
  testOnly: true,
  guildOnly: true,
  minArgs: 2,
  expectedArgs: "<user> <reason>",
  expectedArgsTypes: ["USER", "STRING"],

  callback: ({ message, interaction, args }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember("user") as GuildMember);
    if (!target) {
      return "Please tag someone to kick!";
    }
    if (!target.kickable) {
      return {
        custom: true,
        content: "Cannot kick that user!",
        ephemeral: true,
      };
    }
    args.shift();
    const reason = args.join(" ");

    target.kick(reason);

    return {
      custom: true,
      content: `You kicked <@${target.id}>`,
      ephemeral: true,
    };
  },
} as ICommand;
