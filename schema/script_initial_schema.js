const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { ModelManager } = require('@glazed/devtools')
const { createDefinition, createSchema } = require('@ceramicstudio/idx-tools')
const KeyDidResolver = require('key-did-resolver').default;
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const { Ed25519Provider } = require('key-did-provider-ed25519')
const DID = require('dids').DID
const { addProtocols } = require('./add_protocol.js')
require('dotenv').config()

const UsersListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - User Profils List',
  type: 'array',
  items: {
    type: 'string',
    title: 'users DID',
  },
}

const ProtocolsListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'neptune project - Protocols Profils List',
  type: 'object',
  properties: {
    list: {
      type: 'array',
      items: {
        type: 'object',
        title: 'protocolItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
          name: {
            type: 'string',
            title: "protocol's name",
            maxLength: 100,
          }
        },
      },
    },
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      maxLength: 150,
    },
  },
}

const ProtocolUsersSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - User registered on a protocol',
  type: 'array',
  items: {
    type: 'object',
    title: 'users profil',
    properties: {
      DID: {
        type: 'string',
        title: 'user DID',
        maxLength: 100,
      },
      stackID: {
        type: 'number',
        title: 'stack exchange ID',
      },
      lastEpochScore: {
        type: 'number',
        title: 'total score from upvote during last epoch',
      },
    }
  },
}

const ProfilSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - User profil',
  type: 'object',
  properties: {
    stackID: {
      type: 'number',
      title: 'stack exchange ID',
    },
    protocols: {
      type: 'array',
      title: 'Name of the protocols the user registered to',
      items: {
        type: 'string',
      },
      maxLength: 4000,
    },
    caip10Link: {
      type: 'string',
      title: 'link a crypto account to a DID',
      $ref: '#/definitions/caip10Link',
    },
    ethAddr: {
      type: 'string', title: 'crypto address link with the caip10link',
      $ref: '#/definitions/ethAddr',
    }
  },
  definitions: {
    caip10Link: {
      type: 'string',
      pattern: "^ceramic://.+",
      maxLength: 1024,
    },
    ethAddr: {
      type: 'string',
      pattern: "[a-zA-Z0-9]",
      maxLength: 1024,
    }
  }
}

const ProtocolSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - Protocol profil',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: "protocol's name",
      maxLength: 100,
    },
    description: {
      type: 'string',
      title: 'description of the protocol',
    },
    appUrl: {
      type: 'string',
      title: "URL of the protocol's app",
      maxLength: 200,
    },
    logo: {
      type: 'string',
      title: 'logo of the protocol',
    },
    socialMedia: {
      type: 'array',
      title: "All links to protocol's social media",
      items: {
        type: 'object',
        title: 'social media',
        properties: {
          name: {
            type: 'string',
            title: "social media name",
            maxLength: 100,
          },
          url: {
            type: 'string',
            maxLength: 200,
          },
        },
      },
      maxLength: 4000,
    },
    caip10Link: {
      type: 'string',
      title: 'link a crypto account to a DID',
      $ref: '#/definitions/caip10Link',
    },
    ethAddr: {
      type: 'string',
      title: 'crypto address link with the caip10link',
      $ref: '#/definitions/ethAddr',
    },
    users: {
      type: 'string',
      title: 'array of all users registered',
    },
    epoch: {
      type: 'string',
      title: 'current epoch statistic',
    },
    moderation: {
      type: 'string',
      title: 'moderation for current epoch',
    },
  },
  definitions: {
    caip10Link: {
      type: 'string',
      pattern: "^ceramic://.+",
      maxLength: 1024,
    },
    ethAddr: {
      type: 'string',
      pattern: "[a-zA-Z0-9]",
      maxLength: 1024,
    }
  }
}

const ModerationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - moderation part, Q&A ID from stack exchange',
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      title: 'All questions ID',
      items: {
        type: 'object',
        title: 'question',
        properties: {
          id: {
            type: 'number',
            title: 'question ID',
          },
          score: {
            type: 'number',
            title: 'current score for this question',
          },
          questionTitle: {
            type: 'string',
            title: 'question title',
          },
          text: {
            type: 'string',
            title: 'body of the question'
          },
          state: {
            type: 'number',
            title: 'state of validation, 0 is pending, 1 is validated, 2 refused',
            pattern: "[0-2]",
            maxLength: 1,
          },
          shareLink: {
            type: 'string',
            title: 'link toward stackoverflow question or answer'
          },
          reputation: {
            type: 'number',
            title: 'user overall reputation',
          },
          name: {
            type: 'string',
            title: 'user name',
          },
          profileImage: {
            type: 'string',
            title: 'StackOverflow user profile picture',
          },
          userLink: {
            type: 'string',
            title: 'link toward the user stackoverflow account'
          },
        },
      },
    },
    answers: {
      type: 'array',
      title: 'All answers ID',
      items: {
        type: 'object',
        title: 'answer',
        properties: {
          id: {
            type: 'number',
            title: 'answer ID',
          },
          score: {
            type: 'number',
            title: 'current score for this answer',
          },
          questionTitle: {
            type: 'string',
            title: 'question title',
          },
          text: {
            type: 'string',
            title: 'body of the question'
          },
          state: {
            type: 'number',
            title: 'state of validation, 0 is pending, 1 is validated, 2 refused',
            pattern: "[0-2]",
            maxLength: 1,
          },
          shareLink: {
            type: 'string',
            title: 'link toward stackoverflow question or answer'
          },
          reputation: {
            type: 'number',
            title: 'user overall reputation',
          },
          name: {
            type: 'string',
            title: 'user name',
          },
          profileImage: {
            type: 'string',
            title: 'StackOverflow user profile picture',
          },
          userLink: {
            type: 'string',
            title: 'link toward the user stackoverflow account'
          },
        },
      },
    },
  },
}

const EpochStatisticSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Neptune project - current epoch statistic for a protocol',
  type: 'object',
  title: 'statistic for a protocol',
  properties: {
    nbQuestions: {
      type: 'number',
      title: 'total number of questions',
    },
    scoreQuestions: {
      type: 'number',
      title: 'total score for questions',
    },
    nbAnswers: {
      type: 'number',
      title: 'total number of answers',
    },
    scoreAnswers: {
      type: 'number',
      title: 'total score for answers',
    },
    reward: {
      type: 'number',
      title: 'reward for current epoch',
    },
  }
}

async function createModel() {
  try {

    const ceramic = new Ceramic(process.env.CERAMIC_API_URL);
    const keyDidResolver = KeyDidResolver.getResolver()

    const threeIdResolver = ThreeIdResolver.getResolver(ceramic)
    const resolverRegistry = {
      ...threeIdResolver,
      ...keyDidResolver,
    }
    const did = new DID({
      provider: new Ed25519Provider(JSON.parse(process.env.SEED)),
      resolver: resolverRegistry,
    })
    await did.authenticate()
    await ceramic.setDID(did)

    const manager = new ModelManager(ceramic)

    const [
      profil,
      usersList,
      protocol,
      protocolsList,
      protocolUsers,
      moderation,
      epochStatistic
    ] = await Promise.all([
      manager.createSchema('profilUser', ProfilSchema),
      manager.createSchema('allUsersList', UsersListSchema),
      manager.createSchema('profilProtocol', ProtocolSchema),
      manager.createSchema('allProtocolsList', ProtocolsListSchema),
      manager.createSchema('protocolUsers', ProtocolUsersSchema),
      manager.createSchema('moderation', ModerationSchema),
      manager.createSchema('epochStatistic', EpochStatisticSchema),
    ])

    console.log(protocolUsers)

    const profilDefinition = await manager.createDefinition('profil', {
      name: 'List of profils',
      description: 'Neptune project, format for list of profils',
      schema: manager.getSchemaURL(profil)
    })

    const usersListDefinition = await manager.createDefinition('usersList', {
      name: 'List of users',
      description: 'Neptune project, format for list of users',
      schema: manager.getSchemaURL(usersList)
    })

    const protocolsListDefinition = await manager.createDefinition('protocolsList', {
      name: 'List of protocols',
      description: 'Neptune project, format for list of protocols',
      schema: manager.getSchemaURL(protocolsList)
    })

    await addProtocols({ ceramic, manager, protocol, protocolUsers, moderation, epochStatistic });

    const model = await manager.toPublished()

    await writeFile('./schema/model.json', JSON.stringify(model))
  } catch (error) {
    console.error('Ceramic schema error: \n', error)
  }
}

createModel()
