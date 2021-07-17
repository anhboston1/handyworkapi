import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserChatConversation,
  User,
} from '../models';
import {UserChatConversationRepository} from '../repositories';

export class UserChatConversationUserController {
  constructor(
    @repository(UserChatConversationRepository)
    public userChatConversationRepository: UserChatConversationRepository,
  ) { }

  @get('/user-chat-conversations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to UserChatConversation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof UserChatConversation.prototype.id,
  ): Promise<User> {
    return this.userChatConversationRepository.user(id);
  }
}
