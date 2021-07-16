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
  User,
} from '../models';
import {ProjectbidRepository} from '../repositories';

export class ProjectbidUserController {
  constructor(
    @repository(ProjectbidRepository)
    public projectbidRepository: ProjectbidRepository,
  ) { }

  @get('/projectbids/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Projectbid',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Projectbid.prototype.id,
  ): Promise<User> {
    return this.projectbidRepository.user(id);
  }
}
