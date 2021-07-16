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
  Project,
  Projectbid,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectbidController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/projectbids', {
    responses: {
      '200': {
        description: 'Array of Project has many Projectbid',
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
    return this.projectRepository.projectbids(id).find(filter);
  }

  @post('/projects/{id}/projectbids', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectbid)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectbid, {
            title: 'NewProjectbidInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectbid: Omit<Projectbid, 'id'>,
  ): Promise<Projectbid> {
    return this.projectRepository.projectbids(id).create(projectbid);
  }

  @patch('/projects/{id}/projectbids', {
    responses: {
      '200': {
        description: 'Project.Projectbid PATCH success count',
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
    return this.projectRepository.projectbids(id).patch(projectbid, where);
  }

  @del('/projects/{id}/projectbids', {
    responses: {
      '200': {
        description: 'Project.Projectbid DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectbid)) where?: Where<Projectbid>,
  ): Promise<Count> {
    return this.projectRepository.projectbids(id).delete(where);
  }
}
