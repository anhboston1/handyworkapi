import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ChatConversation, ChatConversationRelations, ChatMessage} from '../models';
import {ChatMessageRepository} from './chat-message.repository';

export class ChatConversationRepository extends DefaultCrudRepository<
  ChatConversation,
  typeof ChatConversation.prototype.id,
  ChatConversationRelations
> {

  public readonly chatMessages: HasManyRepositoryFactory<ChatMessage, typeof ChatConversation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ChatMessageRepository') protected chatMessageRepositoryGetter: Getter<ChatMessageRepository>,
  ) {
    super(ChatConversation, dataSource);
    this.chatMessages = this.createHasManyRepositoryFactoryFor('chatMessages', chatMessageRepositoryGetter,);
    this.registerInclusionResolver('chatMessages', this.chatMessages.inclusionResolver);
  }
}
