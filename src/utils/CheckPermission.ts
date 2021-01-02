import Discord from 'discord.js';

/**
 * Build the corresponded command that can be used on
 * Discord from the desired command.
 */
export default function CheckPermission(
  member: Discord.GuildMember | null,
  permission: Discord.PermissionString,
): boolean {
  if (member) return member.hasPermission(permission);
  return false;
}
