import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Projectimages extends Entity {
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
  imageurl: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<Projectimages>) {
    super(data);
  }
}

export interface ProjectimagesRelations {
  // describe navigational properties here
}

export type ProjectimagesWithRelations = Projectimages & ProjectimagesRelations;
