import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UrlType = {};

@Entity()
export class Url extends BaseEntity implements UrlType {}
