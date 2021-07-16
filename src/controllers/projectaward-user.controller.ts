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
  User,
} from '../models';
import {ProjectawardRepository} from '../repositories';

export class ProjectawardUserController {
  constructor(
    @repository(ProjectawardRepository)
    public projectawardRepository: ProjectawardRepository,
  ) { }

  @get('/projectawards/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Projectaward',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Projectaward.prototype.id,
  ): Promise<User> {
    return this.projectawardRepository.user(id);
  }
}
