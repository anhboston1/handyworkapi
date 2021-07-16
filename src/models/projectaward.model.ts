import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Project} from './project.model';

@model({settings: {strict: false}})
export class Projectaward extends Entity {
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
    type: 'date',
    required: true,
  })
  dateawarded: string;

  @property({
    type: 'string',
  })
  message?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Project)
  projectId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Projectaward>) {
    super(data);
  }
}

export interface ProjectawardRelations {
  // describe navigational properties here
}

export type ProjectawardWithRelations = Projectaward & ProjectawardRelations;
