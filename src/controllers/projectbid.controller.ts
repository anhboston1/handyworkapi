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
import {Projectbid} from '../models';
import {ProjectbidRepository} from '../repositories';

export class ProjectbidController {
  constructor(
    @repository(ProjectbidRepository)
    public projectbidRepository : ProjectbidRepository,
  ) {}

  @post('/projectbids')
  @response(200, {
    description: 'Projectbid model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projectbid)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {
            title: 'NewProjectbid',
            exclude: ['id'],
          }),
        },
      },
    })
    projectbid: Omit<Projectbid, 'id'>,
  ): Promise<Projectbid> {
    return this.projectbidRepository.create(projectbid);
  }

  @get('/projectbids/count')
  @response(200, {
    description: 'Projectbid model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projectbid) where?: Where<Projectbid>,
  ): Promise<Count> {
    return this.projectbidRepository.count(where);
  }

  @get('/projectbids')
  @response(200, {
    description: 'Array of Projectbid model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projectbid, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projectbid) filter?: Filter<Projectbid>,
  ): Promise<Projectbid[]> {
    return this.projectbidRepository.find(filter);
  }

  @patch('/projectbids')
  @response(200, {
    description: 'Projectbid PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {partial: true}),
        },
      },
    })
    projectbid: Projectbid,
    @param.where(Projectbid) where?: Where<Projectbid>,
  ): Promise<Count> {
    return this.projectbidRepository.updateAll(projectbid, where);
  }

  @get('/projectbids/{id}')
  @response(200, {
    description: 'Projectbid model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projectbid, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Projectbid, {exclude: 'where'}) filter?: FilterExcludingWhere<Projectbid>
  ): Promise<Projectbid> {
    return this.projectbidRepository.findById(id, filter);
  }

  @patch('/projectbids/{id}')
  @response(204, {
    description: 'Projectbid PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {partial: true}),
        },
      },
    })
    projectbid: Projectbid,
  ): Promise<void> {
    await this.projectbidRepository.updateById(id, projectbid);
  }

  @put('/projectbids/{id}')
  @response(204, {
    description: 'Projectbid PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectbid: Projectbid,
  ): Promise<void> {
    await this.projectbidRepository.replaceById(id, projectbid);
  }

  @del('/projectbids/{id}')
  @response(204, {
    description: 'Projectbid DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectbidRepository.deleteById(id);
  }
}
