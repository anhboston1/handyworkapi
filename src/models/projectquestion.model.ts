import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project} from './project.model';
import {User} from './user.model';

@model()
export class Projectquestion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    index: {
      unique: true
    },
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  question: string;

  @property({
    type: 'string',
    required: true,
  })
  answer: string;

  @property({
    type: 'date',
  })
  questiondate?: string;

  @property({
    type: 'date',
  })
  answerdate?: string;

  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Projectquestion>) {
    super(data);
  }
}

export interface ProjectquestionRelations {
  // describe navigational properties here
}

export type ProjectquestionWithRelations = Projectquestion & ProjectquestionRelations;
