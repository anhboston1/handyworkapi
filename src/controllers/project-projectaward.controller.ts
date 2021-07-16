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
  Projectaward,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectawardController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/projectaward', {
    responses: {
      '200': {
        description: 'Project has one Projectaward',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Projectaward),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectaward>,
  ): Promise<Projectaward> {
    return this.projectRepository.projectaward(id).get(filter);
  }

  @post('/projects/{id}/projectaward', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectaward)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectaward, {
            title: 'NewProjectawardInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectaward: Omit<Projectaward, 'id'>,
  ): Promise<Projectaward> {
    return this.projectRepository.projectaward(id).create(projectaward);
  }

  @patch('/projects/{id}/projectaward', {
    responses: {
      '200': {
        description: 'Project.Projectaward PATCH success count',
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
    return this.projectRepository.projectaward(id).patch(projectaward, where);
  }

  @del('/projects/{id}/projectaward', {
    responses: {
      '200': {
        description: 'Project.Projectaward DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectaward)) where?: Where<Projectaward>,
  ): Promise<Count> {
    return this.projectRepository.projectaward(id).delete(where);
  }
}
