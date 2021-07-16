import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Projectaward} from './projectaward.model';
import {Projectbid} from './projectbid.model';
import {Projectimages} from './projectimages.model';
import {User} from './user.model';
import {Projectquestion} from './projectquestion.model';

@model()
export class Project extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
  })
  dateposted?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  pricerange?: string;

  @property({
    type: 'string',
    required: true,
  })
  skills: string;

  @property({
    type: 'number',
  })
  longtitude?: number;

  @property({
    type: 'number',
  })
  latitude?: number;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Projectimages)
  projectimages: Projectimages[];

  @hasMany(() => Projectbid)
  projectbids: Projectbid[];

  @hasOne(() => Projectaward)
  projectawards: Projectaward[];

  @hasOne(() => Projectaward)
  projectaward: Projectaward;

  @hasMany(() => Projectquestion)
  projectquestions: Projectquestion[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
