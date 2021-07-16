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
import {Projectquestion} from '../models';
import {ProjectquestionRepository} from '../repositories';

export class ProjectquestionController {
  constructor(
    @repository(ProjectquestionRepository)
    public projectquestionRepository : ProjectquestionRepository,
  ) {}

  @post('/projectquestions')
  @response(200, {
    description: 'Projectquestion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projectquestion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {
            title: 'NewProjectquestion',
            exclude: ['id'],
          }),
        },
      },
    })
    projectquestion: Omit<Projectquestion, 'id'>,
  ): Promise<Projectquestion> {
    return this.projectquestionRepository.create(projectquestion);
  }

  @get('/projectquestions/count')
  @response(200, {
    description: 'Projectquestion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projectquestion) where?: Where<Projectquestion>,
  ): Promise<Count> {
    return this.projectquestionRepository.count(where);
  }

  @get('/projectquestions')
  @response(200, {
    description: 'Array of Projectquestion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projectquestion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projectquestion) filter?: Filter<Projectquestion>,
  ): Promise<Projectquestion[]> {
    return this.projectquestionRepository.find(filter);
  }

  @patch('/projectquestions')
  @response(200, {
    description: 'Projectquestion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {partial: true}),
        },
      },
    })
    projectquestion: Projectquestion,
    @param.where(Projectquestion) where?: Where<Projectquestion>,
  ): Promise<Count> {
    return this.projectquestionRepository.updateAll(projectquestion, where);
  }

  @get('/projectquestions/{id}')
  @response(200, {
    description: 'Projectquestion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projectquestion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Projectquestion, {exclude: 'where'}) filter?: FilterExcludingWhere<Projectquestion>
  ): Promise<Projectquestion> {
    return this.projectquestionRepository.findById(id, filter);
  }

  @patch('/projectquestions/{id}')
  @response(204, {
    description: 'Projectquestion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {partial: true}),
        },
      },
    })
    projectquestion: Projectquestion,
  ): Promise<void> {
    await this.projectquestionRepository.updateById(id, projectquestion);
  }

  @put('/projectquestions/{id}')
  @response(204, {
    description: 'Projectquestion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectquestion: Projectquestion,
  ): Promise<void> {
    await this.projectquestionRepository.replaceById(id, projectquestion);
  }

  @del('/projectquestions/{id}')
  @response(204, {
    description: 'Projectquestion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectquestionRepository.deleteById(id);
  }
}
