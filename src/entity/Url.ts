import type { GenericType } from '../types';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

export interface UrlType extends GenericType {
  short_id: string;
  full_url: string;
}

@Entity()
export class Url extends BaseEntity implements UrlType {
  @PrimaryColumn()
  short_id: string;

  @Column()
  full_url: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
