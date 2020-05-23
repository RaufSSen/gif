/**
 * @file commandUsage event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

module.exports = (message, command) => {
  message.channel.send({
    embed: {
      color: message.client.colors.RED,
      title: 'Yanlış Kullanım',
      description: `Dostum yanlış yapıyorsun. Doğrusu böyle değil! :crying_cat_face: `,
      fields: [
        {
          name: 'Yardım Al',
          value: `Ama bunun anlamı doğruyu öğrenemezsin olmuyor! :heart: \n "yardım [komut_adı]" ile nasıl kullanıldığını öğren!\n :smile: :ok_hand: `
        }
      ]
    }
  }).catch(e => {
    message.client.log.error(e);
  });
};
