import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  UserChatConversation,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserChatConversationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-chat-conversations', {
    responses: {
      '200': {
        description: 'Array of User has many UserChatConversation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserChatConversation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserChatConversation>,
  ): Promise<UserChatConversation[]> {
    return this.userRepository.userChatConversations(id).find(filter);
  }

  @post('/users/{id}/user-chat-conversations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserChatConversation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserChatConversation, {
            title: 'NewUserChatConversationInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userChatConversation: Omit<UserChatConversation, 'id'>,
  ): Promise<UserChatConversation> {
    return this.userRepository.userChatConversations(id).create(userChatConversation);
  }

  @patch('/users/{id}/user-chat-conversations', {
    responses: {
      '200': {
        description: 'User.UserChatConversation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserChatConversation, {partial: true}),
        },
      },
    })
    userChatConversation: Partial<UserChatConversation>,
    @param.query.object('where', getWhereSchemaFor(UserChatConversation)) where?: Where<UserChatConversation>,
  ): Promise<Count> {
    return this.userRepository.userChatConversations(id).patch(userChatConversation, where);
  }

  @del('/users/{id}/user-chat-conversations', {
    responses: {
      '200': {
        description: 'User.UserChatConversation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserChatConversation)) where?: Where<UserChatConversation>,
  ): Promise<Count> {
    return this.userRepository.userChatConversations(id).delete(where);
  }
}
