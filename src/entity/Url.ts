import type { GenericType } from 'src/types';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

export interface UrlType extends GenericType {
  url_id: string;
}

@Entity()
export class Url extends BaseEntity implements UrlType {
  @PrimaryColumn()
  url_id: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
