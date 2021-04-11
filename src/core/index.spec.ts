import { createContainer, asClass } from 'awilix';
import Core from '.';
import { ERRORS } from '../Constants';

describe('Core', () => {
  const hostName = `http://urlshortener.com`;
  const sId = 'abc123';

  class UrlRepo {
    checkShortId = (shortId: string) =>
      shortId === sId
        ? {
            url: '',
            short_id: sId,
          }
        : undefined;
    addUrl = () => {};
    getShortId = () => {};
    isValidUrl = () => {};
    createShortId = () => {};
  }

  const setupDi = () => {
    const container = createContainer();

    container.register({
      repo: asClass(UrlRepo),
      core: asClass(Core),
    });

    return container;
  };

  const container = setupDi();
  const core = container.cradle.core;

  afterAll(container.dispose);

  test('createShortId', async () => {
    await expect(core.createShortId()).resolves.toHaveLength(6);
  });

  describe('addUrlToDatabase', () => {
    test('returns urlshortener domain and shortcode', () => {
      core.addUrlToDatabase('http://heroku.com', hostName).then((e: any) => {
        expect(e).toContain(hostName + '/');
        expect(e.split('.')[1].split('/')[1]).toHaveLength(6);
      });
    });

    test('invalid url throws error', async () => {
      await expect(() =>
        core.addUrlToDatabase(undefined, hostName)
      ).rejects.toThrow(ERRORS.URL.INVALID_URL);
    });
  });

  test('getShortId to return string', async () => {
    await expect(core.getShortId(hostName)).resolves.toContain(hostName);
    await expect(core.getShortId(hostName)).resolves.not.toContain(undefined);
    await expect(core.getShortId(hostName, sId)).resolves.toContain(
      hostName + '/' + sId
    );
  });

  test('isValidUrl to return boolean', async () => {
    expect(core.isValidUrl('')).toBeFalsy();
    expect(core.isValidUrl('google.com')).toBeTruthy();
    expect(core.isValidUrl('http://google.com')).toBeTruthy();
    expect(core.isValidUrl('http://google.com/')).toBeTruthy();
    expect(core.isValidUrl('http://google.com/page')).toBeTruthy();
    expect(core.isValidUrl('http://google.com.ng')).toBeTruthy();
    expect(core.isValidUrl('www.google.com')).toBeTruthy();
    expect(core.isValidUrl('api.google.com')).toBeTruthy();
  });

  test('getUrl throws error without shortid', async () => {
    await expect(core.getUrl()).rejects.toThrowError();
  });

  test('getUrl throws error for wrong shortid', async () => {
    await expect(core.getUrl('22deef')).rejects.toThrowError();
  });

  test('getUrl returns url for correct shortid', async () => {
    await expect(core.getUrl(sId)).resolves.toMatchObject({
      url: '',
      short_id: sId,
    });
  });
});
