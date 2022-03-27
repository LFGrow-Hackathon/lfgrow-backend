const { TileDocument } = require('@ceramicnetwork/stream-tile')

const createAllStreams = async function ({ name, logo, appUrl, description, socialMedia, config}) {
  const { 
    ceramic,
    manager,
    protocol,
    protocolUsers,
    moderation,
    epochStatistic
  } = config;

  try {
    const usersStream = await TileDocument.create(
      ceramic,
      [{ DID: "test:123", stackID: 42, lastEpochScore: 0 }],
      {
        controllers: [ceramic.did.id],
        schema: manager.getSchemaURL(protocolUsers),
      },
    )

    const epochStream = await TileDocument.create(
      ceramic,
      {
        nbQuestions: 0,
        scoreQuestions: 0,
        nbAnswers: 0,
        reward: 10000
      },
      {
        controllers: [ceramic.did.id],
        schema: manager.getSchemaURL(epochStatistic),
      },
    )

    const moderationStream = await TileDocument.create(
      ceramic,
      {
        questions: [],
        answers: []
      },
      {
        controllers: [ceramic.did.id],
        schema: manager.getSchemaURL(moderation),
      },
    )

    const item = await manager.createTile(name,
      {
        name,
        appUrl,
        logo,
        description,
        socialMedia,
        users: usersStream.id.toString(),
        epoch: epochStream.id.toString(),
        moderation: moderationStream.id.toString()
      },
      { schema: manager.getSchemaURL(protocol) },
    )

    return item;
  } catch (error) {
    console.log(error) }
}

const addProtocols = async function (config) {
  try {
    const uni = await createAllStreams({
      name: "uniswap",
      logo: "",
      appUrl: "https://uniswap.org/",
      description: "A decentralized protocol for automated liquidity.",
      socialMedia: [
        { name: "twitter", url: "https://twitter.com/Uniswap"},
        { name: "discord", url: "https://discord.com/invite/FCfyBSbCU5"},
        { name: "reddit", url: "https://www.reddit.com/r/Uniswap"},
      ],
      config
    });

    const ceram = await createAllStreams({
      name: "ceramic",
      logo: "",
      appUrl: "https://ceramic.network/",
      description: "Ceramic is a decentralized, open source platform for creating, hosting, and sharing streams of data.",
      socialMedia: [
        { name: "twitter", url: "https://twitter.com/ceramicnetwork"},
        { name: "discord", url: "https://discord.com/invite/6VRZpGP"},
        { name: "github", url: "https://github.com/ceramicnetwork"},
      ],
      config
    });

    const aav = await createAllStreams({
      name: "aave",
      logo: "",
      appUrl: "https://aave.com/",
      description: "Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.",
      socialMedia: [
        { name: "twitter", url: "https://twitter.com/aaveaave"},
        { name: "discord", url: "https://discord.com/invite/CvKUrqM"},
        { name: "github", url: "https://github.com/aave/aave-protocol"},
      ],
      config
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {addProtocols};
