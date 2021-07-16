import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Projectquestion,
  Project,
} from '../models';
import {ProjectquestionRepository} from '../repositories';

export class ProjectquestionProjectController {
  constructor(
    @repository(ProjectquestionRepository)
    public projectquestionRepository: ProjectquestionRepository,
  ) { }

  @get('/projectquestions/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Projectquestion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof Projectquestion.prototype.id,
  ): Promise<Project> {
    return this.projectquestionRepository.project(id);
  }
}
