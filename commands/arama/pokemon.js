/**
 * @file pokemon command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const Pokedex = xrequire('pokedex-api');
const pokedex = new Pokedex({
  userAgent: 'Bastion: Discord Bot (https://bastionbot.org)',
  version: 'v1'
});

exports.exec = async (Bastion, message, args) => {
  let pokemon;
  if (args.name) {
    pokemon = await pokedex.getPokemonByName(encodeURIComponent(args.name.join(' ')));
  }
  else if (args.number) {
    pokemon = await pokedex.getPokemonByNumber(args.number);
  }
  else {
    return Bastion.emit('commandUsage', message, this.help);
  }

  pokemon = pokemon[0];

  let fields = [
    {
      name: 'Numata',
      value: pokemon.number,
      inline: true
    },
    {
      name: 'Türler',
      value: pokemon.species,
      inline: true
    },
    {
      name: 'Tipler',
      value: pokemon.types.join('\n'),
      inline: true
    },
    {
      name: 'Yetenekler',
      value: `Normal: ${pokemon.abilities.normal.join(', ') || '-'}\nHidden: ${pokemon.abilities.hidden.join(', ') || '-'}`,
      inline: true
    },
    {
      name: 'Yumurta grupları',
      value: pokemon.eggGroups.join('\n'),
      inline: true
    },
    {
      name: 'Cinsiyet Oranı',
      value: pokemon.gender.length ? `${pokemon.gender[0]}:${pokemon.gender[1]}` : 'Cinsiyetsiz',
      inline: true
    },
    {
      name: 'Yükseklik',
      value: pokemon.height,
      inline: true
    },
    {
      name: 'Ağırlık',
      value: pokemon.weight,
      inline: true
    },
    {
      name: 'Evrim hattı',
      value: pokemon.family.evolutionLine.join(' -> ')
    }
  ];

  let note = '';
  if (pokemon.starter) {
    note = note.concat('Başlangıç ​​pokemonu\n');
  }
  if (pokemon.legendary) {
    note = note.concat('Efsanevi bir pokemon\n');
  }
  if (pokemon.mythical) {
    note = note.concat('Efsanevi bir pokemon\n');
  }
  if (pokemon.ultraBeast) {
    note = note.concat('Ultra bir canavardır\n');
  }
  if (pokemon.mega) {
    note = note.concat('Mega evrimleşebilir mi\n');
  }

  fields.push({
    name: 'Not',
    value: note.length ? note : '-'
  });
 let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.utils.fetchMember(message.guild, args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    user = message.author;
  }

  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [ 'userID', 'guildID', 'bastionCurrencies', 'experiencePoints', 'level', 'karma' ].concat([
      [ Bastion.database.literal(`(SELECT COUNT(*) FROM guildMembers AS member WHERE member.guildID = ${message.guild.id} AND member.experiencePoints * 1 > guildMember.experiencePoints * 1)`), 'rank' ]
    ]),
    where: {
      userID: user.id,
      guildID: message.guild.id
    }
  });

  let userModel = await Bastion.database.models.user.findOne({
    attributes: [ 'avatar', 'info', 'birthDate', 'color', 'location' ],
    where: {
      userID: user.id
    }
  });
  await message.channel.send({
    embed: {
        color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
      title: pokemon.name,
      description: `Discovered in generation ${pokemon.gen}`,
      fields: fields,
      thumbnail: {
        url: pokemon.sprite
      },
      footer: {
        icon_url: 'https://pokedevs.bastionbot.org/favicon.png',
        text: 'Pokedex API tarafından güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: ['pokemon'],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, multiple: true, defaultOption: true },
    { name: 'number', type: Number, alias: 'n' }
  ]
};

exports.help = {
  name: 'pokemon',
  description: 'Shows you information on the specified Pokémon.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'pokemon < POKEMON ADI | -n PRODEX NUMARASI >',
  example: [ 'pokemon Pikachu', 'pokemon -n 658' ]
};
