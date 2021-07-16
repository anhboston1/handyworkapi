import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Project, Projectbid, Projectimages, ProjectRelations, User, Projectaward, Projectquestion} from '../models';
import {ProjectawardRepository} from './projectaward.repository';
import {ProjectbidRepository} from './projectbid.repository';
import {ProjectimagesRepository} from './projectimages.repository';
import {UserRepository} from './user.repository';
import {ProjectquestionRepository} from './projectquestion.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof Project.prototype.id>;

  public readonly projectimages: HasManyRepositoryFactory<Projectimages, typeof Project.prototype.id>;

  public readonly projectbids: HasManyRepositoryFactory<Projectbid, typeof Project.prototype.id>;

  public readonly projectaward: HasOneRepositoryFactory<Projectaward, typeof Project.prototype.id>;

  public readonly projectquestions: HasManyRepositoryFactory<Projectquestion, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProjectimagesRepository') protected projectimagesRepositoryGetter: Getter<ProjectimagesRepository>, @repository.getter('ProjectbidRepository') protected projectbidRepositoryGetter: Getter<ProjectbidRepository>, @repository.getter('ProjectawardRepository') protected projectawardRepositoryGetter: Getter<ProjectawardRepository>, @repository.getter('ProjectquestionRepository') protected projectquestionRepositoryGetter: Getter<ProjectquestionRepository>,
  ) {
    super(Project, dataSource);
    this.projectquestions = this.createHasManyRepositoryFactoryFor('projectquestions', projectquestionRepositoryGetter,);
    this.registerInclusionResolver('projectquestions', this.projectquestions.inclusionResolver);
    this.projectaward = this.createHasOneRepositoryFactoryFor('projectaward', projectawardRepositoryGetter);
    this.registerInclusionResolver('projectaward', this.projectaward.inclusionResolver);

    this.projectbids = this.createHasManyRepositoryFactoryFor('projectbids', projectbidRepositoryGetter);
    this.registerInclusionResolver('projectbids', this.projectbids.inclusionResolver);
    this.projectimages = this.createHasManyRepositoryFactoryFor('projectimages', projectimagesRepositoryGetter);
    this.registerInclusionResolver('projectimages', this.projectimages.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
