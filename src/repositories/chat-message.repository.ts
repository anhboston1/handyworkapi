import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ChatMessage, ChatMessageRelations, ChatConversation} from '../models';
import {ChatConversationRepository} from './chat-conversation.repository';

export class ChatMessageRepository extends DefaultCrudRepository<
  ChatMessage,
  typeof ChatMessage.prototype.id,
  ChatMessageRelations
> {

  public readonly chatConversation: BelongsToAccessor<ChatConversation, typeof ChatMessage.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ChatConversationRepository') protected chatConversationRepositoryGetter: Getter<ChatConversationRepository>,
  ) {
    super(ChatMessage, dataSource);
    this.chatConversation = this.createBelongsToAccessorFor('chatConversation', chatConversationRepositoryGetter,);
    this.registerInclusionResolver('chatConversation', this.chatConversation.inclusionResolver);
  }
}
