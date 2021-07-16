import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChatConversation} from './chat-conversation.model';

@model()
export class ChatMessage extends Entity {
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
    type: 'any',
    required: true,
  })
  sender: any;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @belongsTo(() => ChatConversation)
  chatConversationId: string;

  constructor(data?: Partial<ChatMessage>) {
    super(data);
  }
}

export interface ChatMessageRelations {
  // describe navigational properties here
}

export type ChatMessageWithRelations = ChatMessage & ChatMessageRelations;
