import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Projectbid,
  Project,
} from '../models';
import {ProjectbidRepository} from '../repositories';

export class ProjectbidProjectController {
  constructor(
    @repository(ProjectbidRepository)
    public projectbidRepository: ProjectbidRepository,
  ) { }

  @get('/projectbids/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Projectbid',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof Projectbid.prototype.id,
  ): Promise<Project> {
    return this.projectbidRepository.project(id);
  }
}
