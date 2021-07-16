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
  Projectquestion,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectquestionController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'Array of Project has many Projectquestion',
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
    return this.projectRepository.projectquestions(id).find(filter);
  }

  @post('/projects/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projectquestion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projectquestion, {
            title: 'NewProjectquestionInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectquestion: Omit<Projectquestion, 'id'>,
  ): Promise<Projectquestion> {
    return this.projectRepository.projectquestions(id).create(projectquestion);
  }

  @patch('/projects/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'Project.Projectquestion PATCH success count',
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
    return this.projectRepository.projectquestions(id).patch(projectquestion, where);
  }

  @del('/projects/{id}/projectquestions', {
    responses: {
      '200': {
        description: 'Project.Projectquestion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Projectquestion)) where?: Where<Projectquestion>,
  ): Promise<Count> {
    return this.projectRepository.projectquestions(id).delete(where);
  }
}
