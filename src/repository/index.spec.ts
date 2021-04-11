import { createContainer, asClass, asValue } from 'awilix';
import Repo from '.';

describe('Repository', () => {
  const sId = 'abc123';
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

    container.register({
      db: asValue(Db),
      repo: asClass(Repo),
    });

    return container;
  };

  const container = setupDi();
  const repo = container.cradle.repo;

  afterAll(container.dispose);

  test('checkShortId', async () => {
    await expect(repo.checkShortId).toBeCalled;
    await expect(repo.checkShortId(sId)).resolves.toMatchObject(obj);
    await expect(repo.checkShortId('def92q')).rejects.toThrowError();
  });

  test('addUrl', async () => {
    await expect(repo.addUrl()).resolves.not.toThrowError();
  });

  test('getUrlByShortId', async () => {
    await expect(repo.getUrlByShortId(sId)).resolves.not.toThrowError();
    await expect(repo.getUrlByShortId(sId)).resolves.toMatchObject(obj);
    await expect(repo.getUrlByShortId()).rejects.toThrowError();
  });
});
