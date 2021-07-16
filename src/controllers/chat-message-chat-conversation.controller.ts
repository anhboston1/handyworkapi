import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ChatMessage,
  ChatConversation,
} from '../models';
import {ChatMessageRepository} from '../repositories';

export class ChatMessageChatConversationController {
  constructor(
    @repository(ChatMessageRepository)
    public chatMessageRepository: ChatMessageRepository,
  ) { }

  @get('/chat-messages/{id}/chat-conversation', {
    responses: {
      '200': {
        description: 'ChatConversation belonging to ChatMessage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ChatConversation)},
          },
        },
      },
    },
  })
  async getChatConversation(
    @param.path.string('id') id: typeof ChatMessage.prototype.id,
  ): Promise<ChatConversation> {
    return this.chatMessageRepository.chatConversation(id);
  }
}
