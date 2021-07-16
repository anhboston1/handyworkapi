import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Projectbid,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProjectbidController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/projectbids', {
    responses: {
      '200': {
        description: 'Array of User has many Projectbid',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectbid)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectbid>,
  ): Promise<Projectbid[]> {
    return this.userRepository.projectbids(id).find(filter);
  }

  @post('/users/{id}/projectbids', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectbid)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {
            title: 'NewProjectbidInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) projectbid: Omit<Projectbid, 'id'>,
  ): Promise<Projectbid> {
    return this.userRepository.projectbids(id).create(projectbid);
  }

  @patch('/users/{id}/projectbids', {
    responses: {
      '200': {
        description: 'User.Projectbid PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {partial: true}),
        },
      },
    })
    projectbid: Partial<Projectbid>,
    @param.query.object('where', getWhereSchemaFor(Projectbid)) where?: Where<Projectbid>,
  ): Promise<Count> {
    return this.userRepository.projectbids(id).patch(projectbid, where);
  }

  @del('/users/{id}/projectbids', {
    responses: {
      '200': {
        description: 'User.Projectbid DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectbid)) where?: Where<Projectbid>,
  ): Promise<Count> {
    return this.userRepository.projectbids(id).delete(where);
  }
}
