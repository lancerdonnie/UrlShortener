import { createContainer, asClass } from 'awilix';
import Core from './';
import { ERRORS } from './Constants';

class UrlRepo {
  checkShortId = () => {};
  addUrl = () => {};
  getShortId = () => {};
  isValidUrl = () => {};
  createShortId = () => {};
}

const hostName = `http://urlshortener.com`;

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

describe('Core', () => {
  test('createShortId', (done) => {
    core.createShortId().then((e: any) => {
      expect(e).toHaveLength(6);
      done();
    });
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
    await expect(core.getShortId(hostName, 'abc123')).resolves.toContain(
      hostName + '/' + 'abc123'
    );
  });

  test('isValidUrl to return boolean', async () => {
    expect(core.isValidUrl('')).toBeFalsy();
    expect(core.isValidUrl('google.com')).toBeFalsy();
    expect(core.isValidUrl('http://google.com')).not.toBeFalsy();
  });
});
