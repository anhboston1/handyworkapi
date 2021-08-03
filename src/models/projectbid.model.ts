import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Project} from './project.model';

@model()
export class Projectbid extends Entity {
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
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number'
  })
  daysToComplete?: number;

  @property({
    type: 'date',
  })
  datebid?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<Projectbid>) {
    super(data);
  }
}

export interface ProjectbidRelations {
  // describe navigational properties here
}

export type ProjectbidWithRelations = Projectbid & ProjectbidRelations;
