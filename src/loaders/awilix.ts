import type { ICradle } from 'src/types';
import { createContainer, asClass, asFunction } from 'awilix';
import Repo from '../repository';
import Core from '../core';
import UrlController from '../controllers/Url.Controller';

export const setupDi = () => {
  const container = createContainer<ICradle>();

  container.register({
    repo: asClass(Repo),
    core: asClass(Core),
    UrlController: asFunction(UrlController),
  });

  return container;
};
