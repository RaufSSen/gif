/**
 * @file removeSong command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!message.guild.music.enabled) {
    if (Bastion.user.id === '267035345537728512') {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'musicDisabledPublic'), message.channel);
    }
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'musicDisabled'), message.channel);
  }

  if (message.guild.music.textChannelID && message.guild.music.textChannelID !== message.channel.id) {
    return Bastion.log.info('Music channels have been set, so music commands will only work in the Music Text Channel.');
  }

  if (!message.guild.music.songs || !message.guild.music.songs.length) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notPlaying'), message.channel);
  }

  if (!args.index) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  if (args.index >= message.guild.music.songs.length || args.index < 1) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'indexRange'), message.channel);
  }

  let removedSong = message.guild.music.songs.splice(args.index, 1);
  removedSong = removedSong[0];

  await message.guild.music.textChannel.send({
    embed: {
      color: Bastion.colors.RED,
      title: 'Removed from the queue',
      url: removedSong.id ? `https://youtu.be/${removedSong.id}` : '',
      description: removedSong.title,
      thumbnail: {
        url: removedSong.thumbnail
      },
      footer: {
        text: `Position: ${args.index} • Requester: ${removedSong.requester}`
      }
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'index', type: Number, defaultOption: true }
  ],
  musicMasterOnly: true
};

exports.help = {
  name: 'şarkıyısil',
  description: 'Removes a song from the current music queue by its position number.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'şarkıyısil [index]',
  example: [ 'şarkıyısil 3' ]
};
