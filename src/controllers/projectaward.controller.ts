import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Projectaward} from '../models';
import {ProjectawardRepository} from '../repositories';

export class ProjectawardController {
  constructor(
    @repository(ProjectawardRepository)
    public projectawardRepository : ProjectawardRepository,
  ) {}

  @post('/projectawards')
  @response(200, {
    description: 'Projectaward model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projectaward)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {
            title: 'NewProjectaward',
            exclude: ['id'],
          }),
        },
      },
    })
    projectaward: Omit<Projectaward, 'id'>,
  ): Promise<Projectaward> {
    return this.projectawardRepository.create(projectaward);
  }

  @get('/projectawards/count')
  @response(200, {
    description: 'Projectaward model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projectaward) where?: Where<Projectaward>,
  ): Promise<Count> {
    return this.projectawardRepository.count(where);
  }

  @get('/projectawards')
  @response(200, {
    description: 'Array of Projectaward model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projectaward, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projectaward) filter?: Filter<Projectaward>,
  ): Promise<Projectaward[]> {
    return this.projectawardRepository.find(filter);
  }

  @patch('/projectawards')
  @response(200, {
    description: 'Projectaward PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {partial: true}),
        },
      },
    })
    projectaward: Projectaward,
    @param.where(Projectaward) where?: Where<Projectaward>,
  ): Promise<Count> {
    return this.projectawardRepository.updateAll(projectaward, where);
  }

  @get('/projectawards/{id}')
  @response(200, {
    description: 'Projectaward model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projectaward, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Projectaward, {exclude: 'where'}) filter?: FilterExcludingWhere<Projectaward>
  ): Promise<Projectaward> {
    return this.projectawardRepository.findById(id, filter);
  }

  @patch('/projectawards/{id}')
  @response(204, {
    description: 'Projectaward PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {partial: true}),
        },
      },
    })
    projectaward: Projectaward,
  ): Promise<void> {
    await this.projectawardRepository.updateById(id, projectaward);
  }

  @put('/projectawards/{id}')
  @response(204, {
    description: 'Projectaward PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectaward: Projectaward,
  ): Promise<void> {
    await this.projectawardRepository.replaceById(id, projectaward);
  }

  @del('/projectawards/{id}')
  @response(204, {
    description: 'Projectaward DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectawardRepository.deleteById(id);
  }
}
