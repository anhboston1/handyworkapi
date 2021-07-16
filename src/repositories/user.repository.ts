import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Project, Projectbid, Projectaward, Projectquestion} from '../models';
import {ProjectRepository} from './project.repository';
import {ProjectbidRepository} from './projectbid.repository';
import {ProjectawardRepository} from './projectaward.repository';
import {ProjectquestionRepository} from './projectquestion.repository';

export type Credentials = {
  email: string;
  password: string;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly projects: HasManyRepositoryFactory<Project, typeof User.prototype.id>;

  public readonly projectbids: HasManyRepositoryFactory<Projectbid, typeof User.prototype.id>;

  public readonly projectawards: HasManyRepositoryFactory<Projectaward, typeof User.prototype.id>;

  public readonly projectquestions: HasManyRepositoryFactory<Projectquestion, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('ProjectbidRepository') protected projectbidRepositoryGetter: Getter<ProjectbidRepository>, @repository.getter('ProjectawardRepository') protected projectawardRepositoryGetter: Getter<ProjectawardRepository>, @repository.getter('ProjectquestionRepository') protected projectquestionRepositoryGetter: Getter<ProjectquestionRepository>,
  ) {
    super(User, dataSource);
    this.projectquestions = this.createHasManyRepositoryFactoryFor('projectquestions', projectquestionRepositoryGetter,);
    this.registerInclusionResolver('projectquestions', this.projectquestions.inclusionResolver);
    this.projectawards = this.createHasManyRepositoryFactoryFor('projectawards', projectawardRepositoryGetter,);
    this.registerInclusionResolver('projectawards', this.projectawards.inclusionResolver);
    this.projectbids = this.createHasManyRepositoryFactoryFor('projectbids', projectbidRepositoryGetter,);
    this.registerInclusionResolver('projectbids', this.projectbids.inclusionResolver);
    this.projects = this.createHasManyRepositoryFactoryFor('projects', projectRepositoryGetter,);
    this.registerInclusionResolver('projects', this.projects.inclusionResolver);
  }
}
