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
  User,
} from '../models';
import {ProjectquestionRepository} from '../repositories';

export class ProjectquestionUserController {
  constructor(
    @repository(ProjectquestionRepository)
    public projectquestionRepository: ProjectquestionRepository,
  ) { }

  @get('/projectquestions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Projectquestion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Projectquestion.prototype.id,
  ): Promise<User> {
    return this.projectquestionRepository.user(id);
  }
}
