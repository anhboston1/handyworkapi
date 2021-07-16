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
  Projectaward,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProjectawardController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/projectawards', {
    responses: {
      '200': {
        description: 'Array of User has many Projectaward',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectaward)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectaward>,
  ): Promise<Projectaward[]> {
    return this.userRepository.projectawards(id).find(filter);
  }

  @post('/users/{id}/projectawards', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectaward)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {
            title: 'NewProjectawardInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) projectaward: Omit<Projectaward, 'id'>,
  ): Promise<Projectaward> {
    return this.userRepository.projectawards(id).create(projectaward);
  }

  @patch('/users/{id}/projectawards', {
    responses: {
      '200': {
        description: 'User.Projectaward PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {partial: true}),
        },
      },
    })
    projectaward: Partial<Projectaward>,
    @param.query.object('where', getWhereSchemaFor(Projectaward)) where?: Where<Projectaward>,
  ): Promise<Count> {
    return this.userRepository.projectawards(id).patch(projectaward, where);
  }

  @del('/users/{id}/projectawards', {
    responses: {
      '200': {
        description: 'User.Projectaward DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectaward)) where?: Where<Projectaward>,
  ): Promise<Count> {
    return this.userRepository.projectawards(id).delete(where);
  }
}
