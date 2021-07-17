import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserChatConversation, UserChatConversationRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UserChatConversationRepository extends DefaultCrudRepository<
  UserChatConversation,
  typeof UserChatConversation.prototype.id,
  UserChatConversationRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserChatConversation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserChatConversation, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
