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
import {ChatMessage} from '../models';
import {ChatMessageRepository} from '../repositories';

export class ChatMessageController {
  constructor(
    @repository(ChatMessageRepository)
    public chatMessageRepository : ChatMessageRepository,
  ) {}

  @post('/chat-messages')
  @response(200, {
    description: 'ChatMessage model instance',
    content: {'application/json': {schema: getModelSchemaRef(ChatMessage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatMessage, {
            title: 'NewChatMessage',
            exclude: ['id'],
          }),
        },
      },
    })
    chatMessage: Omit<ChatMessage, 'id'>,
  ): Promise<ChatMessage> {
    return this.chatMessageRepository.create(chatMessage);
  }

  @get('/chat-messages/count')
  @response(200, {
    description: 'ChatMessage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ChatMessage) where?: Where<ChatMessage>,
  ): Promise<Count> {
    return this.chatMessageRepository.count(where);
  }

  @get('/chat-messages')
  @response(200, {
    description: 'Array of ChatMessage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ChatMessage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ChatMessage) filter?: Filter<ChatMessage>,
  ): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find(filter);
  }

  @patch('/chat-messages')
  @response(200, {
    description: 'ChatMessage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatMessage, {partial: true}),
        },
      },
    })
    chatMessage: ChatMessage,
    @param.where(ChatMessage) where?: Where<ChatMessage>,
  ): Promise<Count> {
    return this.chatMessageRepository.updateAll(chatMessage, where);
  }

  @get('/chat-messages/{id}')
  @response(200, {
    description: 'ChatMessage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ChatMessage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ChatMessage, {exclude: 'where'}) filter?: FilterExcludingWhere<ChatMessage>
  ): Promise<ChatMessage> {
    return this.chatMessageRepository.findById(id, filter);
  }

  @patch('/chat-messages/{id}')
  @response(204, {
    description: 'ChatMessage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatMessage, {partial: true}),
        },
      },
    })
    chatMessage: ChatMessage,
  ): Promise<void> {
    await this.chatMessageRepository.updateById(id, chatMessage);
  }

  @put('/chat-messages/{id}')
  @response(204, {
    description: 'ChatMessage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chatMessage: ChatMessage,
  ): Promise<void> {
    await this.chatMessageRepository.replaceById(id, chatMessage);
  }

  @del('/chat-messages/{id}')
  @response(204, {
    description: 'ChatMessage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chatMessageRepository.deleteById(id);
  }
}
