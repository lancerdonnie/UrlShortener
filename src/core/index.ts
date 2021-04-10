import type { ICradle } from '../types';
import { SHORT_VALUES, ERRORS } from '../core/Constants';
import { URL } from 'url';

export default class Core {
  constructor(opts: ICradle) {
    this.repo = opts.repo;
  }
  repo;

  public createShortId = async (length: number = 6): Promise<string> => {
    const shortId = [...Array(length)].reduce(
      (acc) =>
        (acc += SHORT_VALUES.charAt(
          Math.floor(Math.random() * SHORT_VALUES.length)
        )),
      ''
    );
    if (await this.repo.checkShortId(shortId))
      return this.createShortId(length);
    return shortId;
  };

  public addUrlToDatabase = async (url: string, hostName: string) => {
    if (!this.isValidUrl(url)) {
      throw new Error(ERRORS.URL.INVALID_URL);
    }
    const shortId = await this.createShortId();
    await this.repo.addUrl(shortId, url);
    return this.getShortId(hostName);
  };

  getShortId = async (hostName: string, shortId?: string) => {
    return hostName + '/' + (shortId ?? (await this.createShortId()));
  };

  isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  getUrl = async (shortId: string) => {
    if (!shortId) throw new Error(ERRORS.URL.NOT_FOUND_URL);
    const url = await this.repo.checkShortId(shortId);
    if (!url) throw new Error(ERRORS.URL.NOT_FOUND_URL);
    return url;
  };
}
