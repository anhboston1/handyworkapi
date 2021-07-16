import {Entity, model, property, hasMany} from '@loopback/repository';
import {ChatMessage} from './chat-message.model';

@model()
export class ChatConversation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    index: {
      unique: true
    },
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  participants: any[];

  @hasMany(() => ChatMessage)
  chatMessages: ChatMessage[];

  constructor(data?: Partial<ChatConversation>) {
    super(data);
  }
}

export interface ChatConversationRelations {
  // describe navigational properties here
}

export type ChatConversationWithRelations = ChatConversation & ChatConversationRelations;
