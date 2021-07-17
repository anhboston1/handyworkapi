import {Entity, model, property, hasMany} from '@loopback/repository';
import {Project} from './project.model';
import {Projectbid} from './projectbid.model';
import {Projectaward} from './projectaward.model';
import {Projectquestion} from './projectquestion.model';
import {UserChatConversation} from './user-chat-conversation.model';

@model()
export class User extends Entity {
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
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;
  username: string | undefined;

  @hasMany(() => Project)
  projects: Project[];

  @hasMany(() => Projectbid)
  projectbids: Projectbid[];

  @hasMany(() => Projectaward)
  projectawards: Projectaward[];

  @hasMany(() => Projectquestion)
  projectquestions: Projectquestion[];

  @hasMany(() => UserChatConversation)
  userChatConversations: UserChatConversation[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
