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
  ChatConversation,
  ChatMessage,
} from '../models';
import {ChatConversationRepository} from '../repositories';

export class ChatConversationChatMessageController {
  constructor(
    @repository(ChatConversationRepository) protected chatConversationRepository: ChatConversationRepository,
  ) { }

  @get('/chat-conversations/{id}/chat-messages', {
    responses: {
      '200': {
        description: 'Array of ChatConversation has many ChatMessage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ChatMessage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ChatMessage>,
  ): Promise<ChatMessage[]> {
    return this.chatConversationRepository.chatMessages(id).find(filter);
  }

  @post('/chat-conversations/{id}/chat-messages', {
    responses: {
      '200': {
        description: 'ChatConversation model instance',
        content: {'application/json': {schema: getModelSchemaRef(ChatMessage)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ChatConversation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatMessage, {
            title: 'NewChatMessageInChatConversation',
            exclude: ['id'],
            optional: ['chatConversationId']
          }),
        },
      },
    }) chatMessage: Omit<ChatMessage, 'id'>,
  ): Promise<ChatMessage> {
    return this.chatConversationRepository.chatMessages(id).create(chatMessage);
  }

  @patch('/chat-conversations/{id}/chat-messages', {
    responses: {
      '200': {
        description: 'ChatConversation.ChatMessage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChatMessage, {partial: true}),
        },
      },
    })
    chatMessage: Partial<ChatMessage>,
    @param.query.object('where', getWhereSchemaFor(ChatMessage)) where?: Where<ChatMessage>,
  ): Promise<Count> {
    return this.chatConversationRepository.chatMessages(id).patch(chatMessage, where);
  }

  @del('/chat-conversations/{id}/chat-messages', {
    responses: {
      '200': {
        description: 'ChatConversation.ChatMessage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ChatMessage)) where?: Where<ChatMessage>,
  ): Promise<Count> {
    return this.chatConversationRepository.chatMessages(id).delete(where);
  }
}
