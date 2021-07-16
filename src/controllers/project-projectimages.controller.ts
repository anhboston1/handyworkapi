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
  Projectimages,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectimagesController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/projectimages', {
    responses: {
      '200': {
        description: 'Array of Project has many Projectimages',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Projectimages)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Projectimages>,
  ): Promise<Projectimages[]> {
    return this.projectRepository.projectimages(id).find(filter);
  }

  @post('/projects/{id}/projectimages', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectimages)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectimages, {
            title: 'NewProjectimagesInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectimages: Omit<Projectimages, 'id'>,
  ): Promise<Projectimages> {
    return this.projectRepository.projectimages(id).create(projectimages);
  }

  @patch('/projects/{id}/projectimages', {
    responses: {
      '200': {
        description: 'Project.Projectimages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectimages, {partial: true}),
        },
      },
    })
    projectimages: Partial<Projectimages>,
    @param.query.object('where', getWhereSchemaFor(Projectimages)) where?: Where<Projectimages>,
  ): Promise<Count> {
    return this.projectRepository.projectimages(id).patch(projectimages, where);
  }

  @del('/projects/{id}/projectimages', {
    responses: {
      '200': {
        description: 'Project.Projectimages DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectimages)) where?: Where<Projectimages>,
  ): Promise<Count> {
    return this.projectRepository.projectimages(id).delete(where);
  }
}
