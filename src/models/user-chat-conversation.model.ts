import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserChatConversation extends Entity {
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
    type: 'string',
  })
  ChatConversationId?: string;

  @property({
    type: 'date',
  })
  timestamp?: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<UserChatConversation>) {
    super(data);
  }
}

export interface UserChatConversationRelations {
  // describe navigational properties here
}

export type UserChatConversationWithRelations = UserChatConversation & UserChatConversationRelations;
