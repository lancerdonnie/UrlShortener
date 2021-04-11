import { createContainer, asFunction, asValue, asClass } from 'awilix';
import makeApp from '../../app';
import request from 'supertest';
import UrlController from '.';
import Core from '../../core';

describe('Url Controller', () => {
  const sId = 'abc123';
  const url = 'google.com';
  const obj = {
    url,
    url_id: sId,
  };
  const Db = {
    url: {
      findOne: async (shortId: string) => {
        if (shortId === sId) return obj;
        throw Error;
      },
      create: () => {},
      save: () => {},
    },
  };
  const setupDi = () => {
    const container = createContainer();
    class UrlRepo {
      checkShortId = (shortId: string) =>
        shortId === sId
          ? {
              url: '',
              url_id: sId,
            }
          : undefined;
      addUrl = () => {};
      getShortId = () => {};
      isValidUrl = () => {};
      createShortId = () => {};
    }
    container.register({
      db: asValue(Db),
      repo: asClass(UrlRepo),
      core: asClass(Core),
      UrlController: asFunction(UrlController),
      createConn: asValue(() => {}),
    });

    return container;
  };

  const container = setupDi();
  const agent = request(makeApp({ container }));

  afterAll(container.dispose);

  test('any url other then /graphql returns redirect', async () => {
    await agent
      .get('/' + sId)
      .expect(302)
      .expect('Location', 'http://');
  });

  test('bad shortid redirects to index.html', async () => {
    await agent
      .get('/def2ww')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('html');
      });
  });
});
