/**
 * @file pollStats command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  if (message.channel.poll && message.channel.poll.collector) {
    let pollRes = message.channel.poll.collector.collected;
    let pollMessage = message.channel.poll.message;

    pollRes = pollRes.map(r => r.content);
    pollRes = pollRes.filter(res => parseInt(res) && parseInt(res) > 0 && parseInt(res) < pollMessage.length);
    if (pollRes.length === 0) {
      return await message.channel.send({
        embed: {
          color: Bastion.colors.RED,
          title: 'Anket Durumu',
          description: 'Daha oy verilmemiş.'
        }
      });
    }

    for (let i = pollMessage.length - 1; i > 0; i--) {
      pollRes.unshift(i);
    }
    let count = {};
    for (let i = 0; i < pollRes.length; i++) {
      count[pollRes[i]] = count[pollRes[i]] ? count[pollRes[i]] + 1 : 1;
    }
    let result = [];
    let totalVotes = (pollRes.length - (pollMessage.length - 1));
    for (let i = 1; i < pollMessage.length; i++) {
      let numOfVotes = count[Object.keys(count)[i - 1]] - 1;
      result.push({
        name: pollMessage[i],
        value: `${(numOfVotes / totalVotes) * 100}% (${numOfVotes} of ${totalVotes})`,
        inline: true
      });
    }

    await message.channel.send({
      embed: {
        color: Bastion.colors.BLUE,
        title: 'Anket Durumu',
        description: `Anket Sonuçları: **${pollMessage[0]}**`,
        fields: result
      }
    });
  }
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'pollStats',
  description: 'Shows the stats of the currently running poll in the channel.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'pollStats',
  example: []
};
