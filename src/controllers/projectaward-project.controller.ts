import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Projectaward,
  Project,
} from '../models';
import {ProjectawardRepository} from '../repositories';

export class ProjectawardProjectController {
  constructor(
    @repository(ProjectawardRepository)
    public projectawardRepository: ProjectawardRepository,
  ) { }

  @get('/projectawards/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Projectaward',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof Projectaward.prototype.id,
  ): Promise<Project> {
    return this.projectawardRepository.project(id);
  }
}
