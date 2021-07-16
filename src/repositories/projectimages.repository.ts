import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Projectimages, ProjectimagesRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class ProjectimagesRepository extends DefaultCrudRepository<
  Projectimages,
  typeof Projectimages.prototype.id,
  ProjectimagesRelations
> {

  public readonly project: BelongsToAccessor<Project, typeof Projectimages.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Projectimages, dataSource);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}
