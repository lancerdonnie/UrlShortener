import type { Response, Request, Router } from 'express';
import type Repo from './repository';
import type Core from './core';

export interface GenericType {
  created_date: Date;
  updated_date: Date;
}

export interface Context {
  req: Request;
  res: Response;
  repo: Repo;
  core: Core;
}

export interface IContainer {
  cradle: ICradle;
}

export interface ICradle {
  repo: Repo;
  core: Core;
  UrlController: Router;
}
