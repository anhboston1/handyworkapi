import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserChatConversation} from '../models';
import {UserChatConversationRepository} from '../repositories';

export class UserChatConversationControllerController {
  constructor(
    @repository(UserChatConversationRepository)
    public userChatConversationRepository : UserChatConversationRepository,
  ) {}

  @post('/user-chat-conversations')
  @response(200, {
    description: 'UserChatConversation model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserChatConversation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserChatConversation, {
            title: 'NewUserChatConversation',
            exclude: ['id'],
          }),
        },
      },
    })
    userChatConversation: Omit<UserChatConversation, 'id'>,
  ): Promise<UserChatConversation> {
    return this.userChatConversationRepository.create(userChatConversation);
  }

  @get('/user-chat-conversations/count')
  @response(200, {
    description: 'UserChatConversation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserChatConversation) where?: Where<UserChatConversation>,
  ): Promise<Count> {
    return this.userChatConversationRepository.count(where);
  }

  @get('/user-chat-conversations')
  @response(200, {
    description: 'Array of UserChatConversation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserChatConversation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserChatConversation) filter?: Filter<UserChatConversation>,
  ): Promise<UserChatConversation[]> {
    return this.userChatConversationRepository.find(filter);
  }

  @patch('/user-chat-conversations')
  @response(200, {
    description: 'UserChatConversation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserChatConversation, {partial: true}),
        },
      },
    })
    userChatConversation: UserChatConversation,
    @param.where(UserChatConversation) where?: Where<UserChatConversation>,
  ): Promise<Count> {
    return this.userChatConversationRepository.updateAll(userChatConversation, where);
  }

  @get('/user-chat-conversations/{id}')
  @response(200, {
    description: 'UserChatConversation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserChatConversation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserChatConversation, {exclude: 'where'}) filter?: FilterExcludingWhere<UserChatConversation>
  ): Promise<UserChatConversation> {
    return this.userChatConversationRepository.findById(id, filter);
  }

  @patch('/user-chat-conversations/{id}')
  @response(204, {
    description: 'UserChatConversation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserChatConversation, {partial: true}),
        },
      },
    })
    userChatConversation: UserChatConversation,
  ): Promise<void> {
    await this.userChatConversationRepository.updateById(id, userChatConversation);
  }

  @put('/user-chat-conversations/{id}')
  @response(204, {
    description: 'UserChatConversation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userChatConversation: UserChatConversation,
  ): Promise<void> {
    await this.userChatConversationRepository.replaceById(id, userChatConversation);
  }

  @del('/user-chat-conversations/{id}')
  @response(204, {
    description: 'UserChatConversation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userChatConversationRepository.deleteById(id);
  }
}
