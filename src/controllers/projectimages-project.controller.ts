import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Projectimages,
  Project,
} from '../models';
import {ProjectimagesRepository} from '../repositories';

export class ProjectimagesProjectController {
  constructor(
    @repository(ProjectimagesRepository)
    public projectimagesRepository: ProjectimagesRepository,
  ) { }

  @get('/projectimages/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Projectimages',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof Projectimages.prototype.id,
  ): Promise<Project> {
    return this.projectimagesRepository.project(id);
  }
}
