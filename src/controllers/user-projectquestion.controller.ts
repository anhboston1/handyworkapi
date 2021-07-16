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
  Projectquestion,
} from '../models';
import {UserRepository} from '../repositories';

export class UserProjectquestionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'Array of User has many Projectquestion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectquestion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectquestion>,
  ): Promise<Projectquestion[]> {
    return this.userRepository.projectquestions(id).find(filter);
  }

  @post('/users/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectquestion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {
            title: 'NewProjectquestionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) projectquestion: Omit<Projectquestion, 'id'>,
  ): Promise<Projectquestion> {
    return this.userRepository.projectquestions(id).create(projectquestion);
  }

  @patch('/users/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'User.Projectquestion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {partial: true}),
        },
      },
    })
    projectquestion: Partial<Projectquestion>,
    @param.query.object('where', getWhereSchemaFor(Projectquestion)) where?: Where<Projectquestion>,
  ): Promise<Count> {
    return this.userRepository.projectquestions(id).patch(projectquestion, where);
  }

  @del('/users/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'User.Projectquestion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectquestion)) where?: Where<Projectquestion>,
  ): Promise<Count> {
    return this.userRepository.projectquestions(id).delete(where);
  }
}
