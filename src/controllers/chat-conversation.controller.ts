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
import {ChatConversation} from '../models';
import {ChatConversationRepository} from '../repositories';

export class ChatConversationController {
  constructor(
    @repository(ChatConversationRepository)
    public chatConversationRepository : ChatConversationRepository,
  ) {}

  @post('/chat-conversations')
  @response(200, {
    description: 'ChatConversation model instance',
    content: {'application/json': {schema: getModelSchemaRef(ChatConversation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatConversation, {
            title: 'NewChatConversation',
            exclude: ['id'],
          }),
        },
      },
    })
    chatConversation: Omit<ChatConversation, 'id'>,
  ): Promise<ChatConversation> {
    return this.chatConversationRepository.create(chatConversation);
  }

  @get('/chat-conversations/count')
  @response(200, {
    description: 'ChatConversation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ChatConversation) where?: Where<ChatConversation>,
  ): Promise<Count> {
    return this.chatConversationRepository.count(where);
  }

  @get('/chat-conversations')
  @response(200, {
    description: 'Array of ChatConversation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ChatConversation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ChatConversation) filter?: Filter<ChatConversation>,
  ): Promise<ChatConversation[]> {
    return this.chatConversationRepository.find(filter);
  }

  @patch('/chat-conversations')
  @response(200, {
    description: 'ChatConversation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatConversation, {partial: true}),
        },
      },
    })
    chatConversation: ChatConversation,
    @param.where(ChatConversation) where?: Where<ChatConversation>,
  ): Promise<Count> {
    return this.chatConversationRepository.updateAll(chatConversation, where);
  }

  @get('/chat-conversations/{id}')
  @response(200, {
    description: 'ChatConversation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ChatConversation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ChatConversation, {exclude: 'where'}) filter?: FilterExcludingWhere<ChatConversation>
  ): Promise<ChatConversation> {
    return this.chatConversationRepository.findById(id, filter);
  }

  @patch('/chat-conversations/{id}')
  @response(204, {
    description: 'ChatConversation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatConversation, {partial: true}),
        },
      },
    })
    chatConversation: ChatConversation,
  ): Promise<void> {
    await this.chatConversationRepository.updateById(id, chatConversation);
  }

  @put('/chat-conversations/{id}')
  @response(204, {
    description: 'ChatConversation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chatConversation: ChatConversation,
  ): Promise<void> {
    await this.chatConversationRepository.replaceById(id, chatConversation);
  }

  @del('/chat-conversations/{id}')
  @response(204, {
    description: 'ChatConversation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chatConversationRepository.deleteById(id);
  }
}
