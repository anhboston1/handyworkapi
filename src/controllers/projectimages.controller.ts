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
import {Projectimages} from '../models';
import {ProjectimagesRepository} from '../repositories';

export class ProjectimagesController {
  constructor(
    @repository(ProjectimagesRepository)
    public projectimagesRepository : ProjectimagesRepository,
  ) {}

  @post('/projectimages')
  @response(200, {
    description: 'Projectimages model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projectimages)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectimages, {
            title: 'NewProjectimages',
            exclude: ['id'],
          }),
        },
      },
    })
    projectimages: Omit<Projectimages, 'id'>,
  ): Promise<Projectimages> {
    return this.projectimagesRepository.create(projectimages);
  }

  @get('/projectimages/count')
  @response(200, {
    description: 'Projectimages model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projectimages) where?: Where<Projectimages>,
  ): Promise<Count> {
    return this.projectimagesRepository.count(where);
  }

  @get('/projectimages')
  @response(200, {
    description: 'Array of Projectimages model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projectimages, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projectimages) filter?: Filter<Projectimages>,
  ): Promise<Projectimages[]> {
    return this.projectimagesRepository.find(filter);
  }

  @patch('/projectimages')
  @response(200, {
    description: 'Projectimages PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectimages, {partial: true}),
        },
      },
    })
    projectimages: Projectimages,
    @param.where(Projectimages) where?: Where<Projectimages>,
  ): Promise<Count> {
    return this.projectimagesRepository.updateAll(projectimages, where);
  }

  @get('/projectimages/{id}')
  @response(200, {
    description: 'Projectimages model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projectimages, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Projectimages, {exclude: 'where'}) filter?: FilterExcludingWhere<Projectimages>
  ): Promise<Projectimages> {
    return this.projectimagesRepository.findById(id, filter);
  }

  @patch('/projectimages/{id}')
  @response(204, {
    description: 'Projectimages PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectimages, {partial: true}),
        },
      },
    })
    projectimages: Projectimages,
  ): Promise<void> {
    await this.projectimagesRepository.updateById(id, projectimages);
  }

  @put('/projectimages/{id}')
  @response(204, {
    description: 'Projectimages PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectimages: Projectimages,
  ): Promise<void> {
    await this.projectimagesRepository.replaceById(id, projectimages);
  }

  @del('/projectimages/{id}')
  @response(204, {
    description: 'Projectimages DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectimagesRepository.deleteById(id);
  }
}
