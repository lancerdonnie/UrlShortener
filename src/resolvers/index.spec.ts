import { createContainer, asFunction, asValue, asClass } from 'awilix';
import makeApp from '../app';
import request from 'supertest';
import { Router } from 'express';
import Core from '../core';

describe('', () => {
  const sId = 'abc123';
  const url = 'google.com';
  const obj = {
    url: '',
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
              url_id: 'abc123',
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
      UrlController: asFunction(() => Router()),
      createConn: asValue(() => {}),
    });

    return container;
  };

  const container = setupDi();
  const agent = request(makeApp({ container }));

  afterAll(container.dispose);

  test('shortenURL', async () => {
    await agent
      .post('/graphql')
      .send({ query: `{shortenURL(url: "${url}")}` })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.shortenURL).toBeDefined;
        expect(res.body.errors).toBeUndefined;
      });
  });
});
